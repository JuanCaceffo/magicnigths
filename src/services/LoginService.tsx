import axios from 'axios'
import { REST_SERVER_URL } from './contants'
import { UserLogin } from 'src/data/model/UserLogin'



class LoginService {
  id: number

  constructor(){
    this.id = 0
  }

  async postUserLogin(userLogin: UserLogin) {
    const idUsuario = axios.post(`${REST_SERVER_URL}/userLogin`,userLogin.toJSON()).then()      
    this.id = (await idUsuario).data
  }

}

export const loginService = new LoginService()
