import axios from 'axios'
import { REST_SERVER_URL } from './contants'
import { UserLogin } from 'src/data/model/UserLogin'
import { User } from 'src/data/model/User'
import { Friend } from 'src/data/model/Friend'
import { Show } from 'src/data/model/Show'
import { ShowProps } from 'src/data/interfaces/ShowProps'

class UserService {
  id: number

  constructor() {
    this.id = -1
  }

  async postUserLogin(userLogin: UserLogin) {
    const idUsuario = await axios.post(`${REST_SERVER_URL}/login`, userLogin)
    this.id = idUsuario.data
  }

  async getUser() {
    const userData = (await axios.get(`${REST_SERVER_URL}/user_profile/${this.id}`).then()).data
    return new User(
      userData.name,
      userData.surname,
      userData.username,
      new Date(userData.birthday),
      userData.dni,
      userData.img,
    )
  }

  async updateUser(user: User) {
    await axios.put(`${REST_SERVER_URL}/user_profile/${this.id}`, {
      name: user.name,
      surname: user.surname,
      username: user.username,
      birthday: user.birthday.toISOString(), // Fecha a un formato compatible con el servidor
      dni: user.dni,
      img: user.img,
    })
  }

  async getCredit() {
    return (await axios.get(`${REST_SERVER_URL}/user_profile/${this.id}/credit`).then()).data
  }

  async addCreditToUser(creditToAdd: number) {
    // Actualización del crédito del back
    await axios.put(`${REST_SERVER_URL}/user_profile/${this.id}/add_credit`, { credit: creditToAdd })

    // Actualización del crédito localmente
    const credit = await this.getCredit()
    return credit
  }

  async getFriends(): Promise<Friend[]> {
    const response = await axios.get(`${REST_SERVER_URL}/user_profile/${this.id}/friends`)
    const friends = response.data

    return friends
  }

  async deleteFriend(friendId: number) {
    await axios.delete(`${REST_SERVER_URL}/user_profile/${this.id}/friends/${friendId}`)
  }

  async getPurchasedTickets():  Promise<Show[]> {
    const response = await axios.get(`${REST_SERVER_URL}/user_profile/${this.id}/purchased_tickets`)
    const purchasedTicketsData = response.data

    const purchasedTickets: Show[] = purchasedTicketsData.map((purchasedTicketData: ShowProps) => {
      return new Show({
        id: purchasedTicketData.id,
        showImg: purchasedTicketData.showImg,
        showName: purchasedTicketData.showName,
        rating: purchasedTicketData.rating,
        totalComments: purchasedTicketData.totalComments,
        facilityName: purchasedTicketData.facilityName,
        dates: purchasedTicketData.dates.map((dateString) => new Date(dateString)),
        userImageNames: purchasedTicketData.userImageNames,
        price: purchasedTicketData.price,
        bandName: purchasedTicketData.bandName
      })
    })
  
    return purchasedTickets
  }
}


export const userService = new UserService()
