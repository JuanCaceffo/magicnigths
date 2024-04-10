import axios from 'axios'
import { ShowProps } from 'src/data/interfaces/ShowProps'
import { REST_SERVER_URL } from './contants'
import { Show } from 'src/data/model/Show'
import { Seat, SeatArgs } from 'src/data/model/Seat'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'
import { FilterArgs } from 'src/components/Search/Search'

class ShowService {
  async getShows(filter: FilterArgs) {
    const data = (
      await axios.get<ShowProps[]>(`${REST_SERVER_URL}/shows?userId=${userSessionStorage.getUserId()}`, {
        params: filter,
      })
    ).data
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

    return seatsJsonWithIndex.map((seat) => Seat.fromJSON(seat))
  }

  addShowDate = async (show: Show, newDate: Date) => {
    const isoDate = newDate.toISOString()
    const userId = userSessionStorage.getUserId()

    await axios.post(`${REST_SERVER_URL}/show/${show.id}/create-show-date`, { userId: userId, date: isoDate })
  }
}

export const showService = new ShowService()
