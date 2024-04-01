import axios from 'axios'
import { REST_SERVER_URL } from './contants'
import { UserLogin } from 'src/data/model/UserLogin'
import { USER_KEY_STORAGE } from 'src/data/helpers/userSessionStorage'

class LoginService {
  async postUserLogin(userLogin: UserLogin) {
    const idUsuario = axios.post(`${REST_SERVER_URL}/login`, userLogin).then()
    //TODO: buscar una forma mas segura de almacenar el id del usuario logeado
    sessionStorage.setItem(USER_KEY_STORAGE, (await idUsuario).data)
  }
}

export const loginService = new LoginService()
