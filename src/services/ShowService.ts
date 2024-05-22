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
    const data = (
      userSessionStorage.userIsAdmin()
        ? await axios.get(`${REST_SERVER_URL}/show/${id}/user/${userSessionStorage.getUserId()}`)
        : await axios.get(`${REST_SERVER_URL}/show/${id}`)
    ).data
    console.log(data)
    return new Show(data)
  }

  getSeatsByShowDate = async (showDate: ShowDate) => {
    const seatsJson = (await axios.get<SeatArgs[]>(`${REST_SERVER_URL}/showdate/${showDate.id}/seats`)).data
    console.log(seatsJson)
    const seatsJsonWithIndex = seatsJson.map((seat) => ({
      ...seat,
      showDateid: showDate.id,
      disabled: showDate.date < new Date() && false,
    }))
    return seatsJsonWithIndex.map((seat) => Seat.fromJSON(seat))
  }

  addShowDate = async (show: Show, newDate: Date) => {
    const isoDate = newDate.toISOString()

    await axios.post(`${REST_SERVER_URL}/show/new-show-date`, {
      date: isoDate,
      userId: userSessionStorage.getUserId(),
      showId: show.id,
    })
  }

  getShowStatsById = async (showId: number): Promise<ShowStat[]> => {
    const showJson = (await axios.get(`${REST_SERVER_URL}/show/${showId}/user/${userSessionStorage.getUserId()}/kpi`))
      .data
    return showJson.map((show: ShowStatsProps) => ShowStat.toJson(show))
  }

  async addPendingAttendee(showId: number) {
    await axios.patch<number>(`${REST_SERVER_URL}/show/${showId}/add_pending`)
  }
}

export const showService = new ShowService()
