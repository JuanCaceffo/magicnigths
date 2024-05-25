import axios from 'axios'
import { REST_SERVER_URL, PATH } from './contants'
import { UserLogin } from 'models/UserLogin'
import { User } from 'models/User'
import { Friend } from 'models/interfaces/Friend'
import { Show } from 'models/Show'
import { ShowProps } from 'models/interfaces/ShowProps'
import { userSessionStorage } from 'models/helpers/userSessionStorage'
import { CommentCreateDTO, CommentDTO } from 'models/interfaces/CommentDTO'
import { UserLoginProps, UserUpdateProps } from 'models/interfaces/UserProps'

class UserService {
  async postUserLogin(userLogin: UserLogin) {
    const idUsuario = await axios.post<UserLoginProps>(`${REST_SERVER_URL}/${PATH.USER}/login`, userLogin)
    sessionStorage.setItem(userSessionStorage.USER_KEY_STORAGE, idUsuario.data.id.toString())
    sessionStorage.setItem(userSessionStorage.USER_ADMIN_STATUS, idUsuario.data.role.toString())
  }

  async getUser() {
    const userData = (await axios.get(`${REST_SERVER_URL}/${PATH.USER}/${userSessionStorage.getUserId()}`).then()).data
    return new User(userData)
  }

  async updateUser(userUpdate: UserUpdateProps) {
    await axios.patch<UserUpdateProps>(
      `${REST_SERVER_URL}/${PATH.USER}/${userSessionStorage.getUserId()}/update`,
      userUpdate,
    )
  }

  async getCredit() {
    return (await axios.get(`${REST_SERVER_URL}/${PATH.USER}/${userSessionStorage.getUserId()}/balance`).then()).data
  }

  async addCreditToUser(creditToAdd: number) {
    await axios.patch(`${REST_SERVER_URL}/${PATH.USER}/${userSessionStorage.getUserId()}/modify_balance`, creditToAdd, {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    })
    const credit = await this.getCredit()
    return credit
  }

  async getFriends(): Promise<Friend[]> {
    const response = await axios.get(`${REST_SERVER_URL}/${PATH.USER}/${userSessionStorage.getUserId()}/friends`)
    const friends = response.data

    return friends
  }

  async deleteFriend(friendId: number) {
    await axios.delete(`${REST_SERVER_URL}/${PATH.USER}/${userSessionStorage.getUserId()}/friend/${friendId}`)
  }

  async getBoughtTickets(): Promise<Show[]> {
    const response = (
      await axios.get<ShowProps[]>(`${REST_SERVER_URL}/${PATH.USER}/${userSessionStorage.getUserId()}/bought_tickets`)
    ).data
    return response.map((data) => new Show(data))
  }

  async getComments(): Promise<CommentDTO[]> {
    return (await axios.get<CommentDTO[]>(`${REST_SERVER_URL}/${PATH.COMMENT}/user/${userSessionStorage.getUserId()}`))
      .data
  }

  async removeComment(commentId: number) {
    return await axios.delete(
      `${REST_SERVER_URL}/${PATH.COMMENT}/${commentId}/${PATH.USER}/${userSessionStorage.getUserId()}`,
    )
  }

  async addComment(comment: CommentCreateDTO) {
    return axios.post(`${REST_SERVER_URL}/${PATH.COMMENT}/add`, comment)
  }

  async isAdmin(): Promise<boolean> {
    const isAdmin = (
      await axios.get(`${REST_SERVER_URL}/user/validate`, { params: { userId: userSessionStorage.getUserId() } })
    ).data
    return isAdmin
  }
}

export const userService = new UserService()
