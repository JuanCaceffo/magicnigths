import axios from 'axios'
import { ShowProps } from 'src/data/interfaces/ShowProps'
import { REST_SERVER_URL } from './contants'
import { Show } from 'src/data/model/Show'
import { getUserId } from 'src/data/helpers/userSessionStorage'
import { Seat } from 'src/data/model/Seat'

class ShowService {
  async getShows() {
    const data = (await axios.get<ShowProps[]>(`${REST_SERVER_URL}/shows?userId=${getUserId()}`)).data

    return data.map((show) => new Show(show))
  }

  getShowById = async (showId: number) => {
    const showJson = await axios.get(`${REST_SERVER_URL}/show/${showId}`)
    return new Show(showJson.data)
  }

  getShowDatesById = async (showId: number, selectedDate: Date) => {
    const fechaIso = selectedDate.toISOString()
    console.log(fechaIso)
    const showDatesJson = await axios.get(`${REST_SERVER_URL}/show_dates/${showId}`, {
      params: {
        fechaIso,
      },
    })

    return Seat.fromJSON(showDatesJson.data)
  }
}

export const showService = new ShowService()
