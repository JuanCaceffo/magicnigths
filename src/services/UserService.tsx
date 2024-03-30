import axios from 'axios'
import { REST_SERVER_URL } from './contants'
import { UserLogin } from 'src/data/model/UserLogin'
import { User } from 'src/data/model/User'
import { Friend } from 'src/data/model/Friend'



class UserService {
  id: number

  constructor(){
    this.id = -1
  }

  async postUserLogin(userLogin: UserLogin) {
    const idUsuario = await axios.post(`${REST_SERVER_URL}/login`,userLogin)    
    this.id = idUsuario.data
  }

  async getUser() {
    const userData = (await axios.get(`${REST_SERVER_URL}/user_profile/${this.id}`).then()).data    
    return new User(userData.name, userData.surname, new Date(userData.birthday), userData.dni, userData.img, userData.credit)
  }

  async getFriends(): Promise<Friend[]> {
    const response = await axios.get(`${REST_SERVER_URL}/user_profile/${this.id}/friends`)
    const friends = response.data

    return friends
  }

  async deleteFriend(friendId:number) {
    //TODO: Pegarle al back
   
  }
}

  

export const userService = new UserService()
