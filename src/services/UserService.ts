import axios from 'axios'
import { REST_SERVER_URL, pathPrefix } from './contants'
import { UserLogin } from 'src/data/model/UserLogin'
import { User } from 'src/data/model/User'
import { Friend } from 'src/data/model/Friend'
import { Show } from 'src/data/model/Show'
import { ShowProps } from 'src/data/interfaces/ShowProps'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'
import { CommentCreateDTO, CommentDTO } from 'src/data/interfaces/CommentDTO'

class UserService {
  async postUserLogin(userLogin: UserLogin) {
    const idUsuario = await axios.post<UserLoginProps>(`${REST_SERVER_URL}/${pathPrefix.user}/login`, userLogin)
    sessionStorage.setItem(userSessionStorage.USER_KEY_STORAGE, idUsuario.data.id.toString())
    sessionStorage.setItem(userSessionStorage.USER_ADMIN_STATUS, idUsuario.data.adminStatus.toString())
  }

  async getUser() {
    const userData = (
      await axios.get(`${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/data`).then()
    ).data

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
    await axios.patch(`${REST_SERVER_URL}/api/${pathPrefix.user}/${userSessionStorage.getUserId()}/update`, {
      profileImg: user.profileImg,
      name: user.name,
      surname: user.surname,
      username: user.username,
      birthday: user.birthday.toISOString(), // Fecha a un formato compatible con el servidor
      dni: user.dni,
    })
  }

  async getCredit() {
    return (await axios.get(`${REST_SERVER_URL}/${pathPrefix.user}/${userSessionStorage.getUserId()}/balance`).then())
      .data
  }

  async addCreditToUser(creditToAdd: number) {
    // Actualización del crédito del back
    await axios.patch(
      `${REST_SERVER_URL}/api/${pathPrefix.user}/${userSessionStorage.getUserId()}/modify_balance`,
      creditToAdd,
      {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      },
    )

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
    const response = (
      await axios.get<ShowProps[]>(`${REST_SERVER_URL}/${pathPrefix.user}/purchased_tickets`, {
        params: { userId: userSessionStorage.getUserId() },
      })
    ).data

    return response.map((data) => new Show(data))
  }

  async getComments(): Promise<CommentDTO[]> {
    return (
      await axios.get<CommentDTO[]>(
        `${REST_SERVER_URL}/${pathPrefix.comments}/user?userId=${userSessionStorage.getUserId()}`,
      )
    ).data
  }

  async removeComment(commentId: number) {
    return await axios.delete(
      `${REST_SERVER_URL}/${pathPrefix.comments}/${commentId}/delete?userId=${userSessionStorage.getUserId()}`,
    )
  }

  async addComment(comment: CommentCreateDTO) {
    return axios.post(`${REST_SERVER_URL}/${pathPrefix.comments}/add-user-comment`, comment)
  }

  async isAdmin(): Promise<boolean> {
    const isAdmin = (
      await axios.get(`${REST_SERVER_URL}/user/validate`, { params: { userId: userSessionStorage.getUserId() } })
    ).data
    return isAdmin
  }
}

export const userService = new UserService()
