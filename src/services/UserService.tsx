import axios from 'axios'
import { REST_SERVER_URL } from './contants'
import { UserLogin } from 'src/data/model/UserLogin'
import { User } from 'src/data/model/User'



class UserService {
  id: number

  constructor(){
    this.id = 0
  }

  async postUserLogin(userLogin: UserLogin) {
    const idUsuario = axios.post(`${REST_SERVER_URL}/login`,userLogin).then()      
    this.id = (await idUsuario).data
  }

  async getUser() {
    const userData = (await axios.get(`${REST_SERVER_URL}/user_profile/${this.id}`).then()).data    
    return new User(userData.name, userData.surname, new Date(userData.birthday), userData.dni, userData.img)
  }

  async getCredit() {
    return (await axios.get(`${REST_SERVER_URL}/user_profile/${this.id}/credit`).then()).data
  }

  async addCreditToUser(creditToAdd: number) {
    // Actualización del crédito del back
    await axios.put(`${REST_SERVER_URL}/user_profile/${this.id}/add_credit`, {"credit": creditToAdd})

    // Actualización del crédito localmente
    const credit = await this.getCredit()
    return credit
  }

}

export const userService = new UserService()
