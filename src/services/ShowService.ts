import axios from 'axios'
import { ShowProps } from 'src/data/interfaces/ShowProps'
import { REST_SERVER_URL } from './contants'
import { Show } from 'src/data/model/Show'
import { getUserId } from 'src/data/helpers/userSessionStorage'
import { Seat, SeatArgs } from 'src/data/model/Seat'

class ShowService {
  async getShows() {
    const data = (await axios.get<ShowProps[]>(`${REST_SERVER_URL}/shows?userId=${getUserId()}`)).data

    return data.map((show) => new Show(show))
  }

  getShowById = async (showId: number) => {
    const showJson = await axios.get(`${REST_SERVER_URL}/show/${showId}`)
    return new Show(showJson.data)
  }

  getSeatsByShowDate = async (showId: number, selectedDate: Date) => {
    const date = selectedDate.toISOString()
    const seatsJson = (
      await axios.get<SeatArgs[]>(`${REST_SERVER_URL}/show_dates/${showId}`, {
        params: {
          date,
        },
      })
    ).data

    const seatsJsonWithIndex = seatsJson.map((seat, index) => ({
      ...seat,
      id: index,
      disabled: selectedDate < new Date(),
    }))

    console.log(seatsJsonWithIndex)

    return seatsJsonWithIndex.map((seat) => Seat.fromJSON(seat))
  }
}

export const showService = new ShowService()
