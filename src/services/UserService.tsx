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

  async getPurchasedTickets(): Promise<Show[]> {
    // const response = await axios.get(`${REST_SERVER_URL}/user_profile/${this.id}/purchased_tickets`)
    // const purchasedTickets = response.data

    //return purchasedTickets
    /////////
    const showProps1: ShowProps = {
      id: 0,
      img: '/mock-imgs/card-show-imgs/velapuerca.jpg',
      name: 'la vela puerca',
      rating: 4,
      totalComments: 150,
      location: 'Buenos Aires',
      dates: [new Date(2024, 7, 12).toDateString(), new Date(2024, 7, 16).toDateString()],
      userImageNames: [
        '/mock-imgs/user-imgs/pablito.jpeg',
        '/mock-imgs/user-imgs/juan.jpeg',
        '/mock-imgs/user-imgs/denise.jpeg',
      ],
      price: 23000,
    }

    const show1: Show = new Show(showProps1)

    const showProps2: ShowProps = {
      id: 1,
      img: '/mock-imgs/card-show-imgs/velapuerca.jpg',
      name: 'la vela puerca',
      rating: 4,
      totalComments: 150,
      location: 'Buenos Aires',
      dates: [new Date(2020, 1, 12).toDateString(), new Date(2020, 7, 16).toDateString()],
      userImageNames: ['/mock-imgs/user-imgs/pablito.jpeg'],
      price: 25000,
    }

    const show2: Show = new Show(showProps2)

    return [show1, show2]
  }
}

export const userService = new UserService()
