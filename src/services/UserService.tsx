import axios from 'axios'
import { REST_SERVER_URL } from './contants'
import { UserLogin } from 'src/data/model/UserLogin'
import { User } from 'src/data/model/User'
import { Friend } from 'src/data/model/Friend'



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
    return new User(userData.name, userData.surname, new Date(userData.birthday), userData.dni, userData.img, userData.credit)
  }

  async getFriends() {
    //TODO: Pegarle al back
    return [new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg', 0), 
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg', 1), 
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg', 2),
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg', 3),
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg', 4),
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg', 5),
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg', 6)]
  }
}

  

export const userService = new UserService()
