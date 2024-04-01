import axios from 'axios'
import { ShowProps } from 'src/data/interfaces/ShowProps'
import { REST_SERVER_URL } from './contants'
import { Show } from 'src/data/model/Show'

class ShowService {
  async getShows() {
    const data = (await axios.get<ShowProps[]>(`${REST_SERVER_URL}/show/`)).data
    return data.map((show) => new Show(show))
  }
}

export const showService = new ShowService()
