import axios from 'axios'
import { ShowProps, ShowStatsProps } from 'models/interfaces/ShowProps'
import { REST_SERVER_URL } from './contants'
import { Show } from 'models/Show'
import { Seat, SeatArgs } from 'models/Seat'
import { userSessionStorage } from 'models/helpers/userSessionStorage'
import { FilterArgs } from 'components/Search/Search'
import { ShowStat } from 'models/ShowStats'
import { ShowDate } from 'models/ShowDate'

class ShowService {
  async getAllShows(filter: FilterArgs) {
    const data = (
      await axios.get<ShowProps[]>(`${REST_SERVER_URL}/show`, {
        params: { userId: userSessionStorage.getUserId(), ...filter },
      })
    ).data
    return data.map((show) => new Show(show))
  }

  getShowById = async (id: number) => {
    const data = (await axios.get(`${REST_SERVER_URL}/show/${id}`)).data
    return new Show(data)
  }

  getSeatsByShowDate = async (showDate: ShowDate) => {
    const seatsJson = (await axios.get<SeatArgs[]>(`${REST_SERVER_URL}/showdate/${showDate.id}/seats`)).data
    const seatsJsonWithIndex = seatsJson.map((seat) => ({
      ...seat,
      showDateid: showDate.id,
      disabled: showDate.date < new Date(),
    }))
    return seatsJsonWithIndex.map((seat) => Seat.fromJSON(seat))
  }

  addShowDate = async (show: Show, newDate: Date) => {
    const isoDate = newDate.toISOString()

    await axios.post(`${REST_SERVER_URL}/admin/show/${show.id}/create-show-date`, {
      userId: userSessionStorage.getUserId(),
      date: isoDate,
    })
  }

  getShowStatsById = async (showId: number): Promise<ShowStat[]> => {
    const showJson = (
      await axios.get(`${REST_SERVER_URL}/admin/shows/${showId}`, {
        params: { userId: userSessionStorage.getUserId() },
      })
    ).data

    return showJson.map((show: ShowStatsProps) => ShowStat.toJson(show))
  }
}

export const showService = new ShowService()
