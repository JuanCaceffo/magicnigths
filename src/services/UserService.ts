import axios from 'axios'
import { REST_SERVER_URL, pathPrefix } from './contants'
import { UserLogin } from 'src/data/model/UserLogin'
import { User } from 'src/data/model/User'
import { Friend } from 'src/data/model/Friend'
import { Show } from 'src/data/model/Show'
import { ShowProps } from 'src/data/interfaces/ShowProps'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'

class UserService {
  async postUserLogin(userLogin: UserLogin) {
    const idUsuario = await axios.post(`${REST_SERVER_URL}/${pathPrefix.user}/login`, userLogin)
    sessionStorage.setItem(userSessionStorage.USER_KEY_STORAGE, idUsuario.data)
  }

  async getUser() {
    const userData = (
      await axios.get(`${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/data`).then()
    ).data
    console.log(userData.birthday)
    return new User(
      userData.profileImg,
      userData.name,
      userData.surname,
      userData.username,
      new Date(userData.birthday),
      userData.dni,
    )
  }

  async updateUser(user: User) {
    await axios.put(`${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/update`, {
      profileImg: user.profileImg,
      name: user.name,
      surname: user.surname,
      username: user.username,
      birthday: user.birthday.toISOString(), // Fecha a un formato compatible con el servidor
      dni: user.dni,
    })
  }

  async getCredit() {
    return (await axios.get(`${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/credit`).then())
      .data
  }

  async addCreditToUser(creditToAdd: number) {
    // Actualización del crédito del back
    await axios.put(`${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/add_credit`, {
      credit: creditToAdd,
    })

    // Actualización del crédito localmente
    const credit = await this.getCredit()
    return credit
  }

  async getFriends(): Promise<Friend[]> {
    const response = await axios.get(`${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/friends`)
    const friends = response.data

    return friends
  }

  async deleteFriend(friendId: number) {
    await axios.delete(
      `${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/remove-friend/${friendId}`,
    )
  }

  async getPurchasedTickets(): Promise<Show[]> {
    const response = await axios.get<ShowProps[]>(
      `${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/purchased_tickets`,
    )

    const purchasedTickets: Show[] = response.data.map((purchasedTicketsData) => new Show(purchasedTicketsData))

    return purchasedTickets
  }

  async getReservedTickets(): Promise<Show[]> {
    const showPropsList = await axios.get<ShowProps[]>(
      `${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/reserved-tickets`,
    )

    return showPropsList.data.map((props) => new Show(props))
  }

  async pruchaseReservedTickets() {
    return await axios.put(
      `${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/purchase-reserved-tickets`,
    )
  }

  async removeReservedTickets() {
    return await axios.put(
      `${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/remove-reserved-tickets`,
    )
  }
}

export const userService = new UserService()
