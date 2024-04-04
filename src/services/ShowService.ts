import axios from 'axios'
import { ShowProps } from 'src/data/interfaces/ShowProps'
import { REST_SERVER_URL } from './contants'
import { Show } from 'src/data/model/Show'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'

class ShowService {
  async getShows() {
    const data = (await axios.get<ShowProps[]>(`${REST_SERVER_URL}/shows?userId=${userSessionStorage.getUserId()}`))
      .data

    return data.map((show) => new Show(show))
  }

  getShowById = async (showId: number) => {
    const showJson = await axios.get(`${REST_SERVER_URL}/show/${showId}`)
    return new Show(showJson.data)
  }
}

export const showService = new ShowService()
