import axios from 'axios'
import { ShowProps, ShowStatsProps } from 'src/data/interfaces/ShowProps'
import { REST_SERVER_URL } from './contants'
import { Show } from 'src/data/model/Show'
import { Seat, SeatArgs } from 'src/data/model/Seat'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'
import { FilterArgs } from 'src/components/Search/Search'
import { ShowStat } from 'src/data/model/ShowStats'
import { ShowDate } from 'src/data/model/ShowDate'

class ShowService {
  userId = userSessionStorage.getUserId()

  async getAllShows(filter: FilterArgs) {
    const data = (
      await axios.get<ShowProps[]>(`${REST_SERVER_URL}/shows`, {
        params: { userId: this.userId, ...filter },
      })
    ).data
    return data.map((show) => new Show(show))
  }

  getShowById = async (id: number) => {
    const data = (await axios.get(`${REST_SERVER_URL}/show/${id}`)).data
    return new Show(data)
  }

  getSeatsByShowDate = async (showId: number, showDate: ShowDate) => {
    const seatsJson = (await axios.get<SeatArgs[]>(`${REST_SERVER_URL}/show_dates/${showId}/date/${showDate.id}`)).data

    const seatsJsonWithIndex = seatsJson.map((seat) => ({
      ...seat,
      showDateid: showDate.id,
      disabled: showDate.date < new Date(),
    }))
    console.log("acaaaaaaaaaaaaaaaaaa", seatsJsonWithIndex)
    return seatsJsonWithIndex.map((seat) => Seat.fromJSON(seat))
  }

  addShowDate = async (show: Show, newDate: Date) => {
    const isoDate = newDate.toISOString()

    await axios.post(`${REST_SERVER_URL}/admin/show/${show.id}/create-show-date`, {
      userId: this.userId,
      date: isoDate,
    })
  }

  getShowStatsById = async (showId: number): Promise<ShowStat[]> => {
    const showJson = (await axios.get(`${REST_SERVER_URL}/admin/shows/${showId}`, { params: { userId: this.userId } }))
      .data
    return showJson.map((show: ShowStatsProps) => ShowStat.toJson(show))
  }
}

export const showService = new ShowService()
