import axios from 'axios'
import { REST_SERVER_URL, pathPrefix } from './contants'
import { ShowProps } from 'src/data/interfaces/ShowProps'
import { Show } from 'src/data/model/Show'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'
import { Ticket } from 'src/data/model/Ticket'

class CartService {
  async getReservedTickets(): Promise<Show[]> {
    const showPropsList = await axios.get<ShowProps[]>(
      `${REST_SERVER_URL}/${pathPrefix.cart}/${pathPrefix.user}/${userSessionStorage.getUserId()}/reserved-tickets`,
    )
    return showPropsList.data.map((props) => new Show(props))
  }

  async pruchaseReservedTickets() {
    return await axios.put(
      `${REST_SERVER_URL}/${pathPrefix.cart}/${pathPrefix.user}/${userSessionStorage.getUserId()}/purchase-reserved-tickets`,
    )
  }

  async addReservedTicket(ticketData: Ticket) {
    try {
      const response = await axios.put(
        `${REST_SERVER_URL}/${pathPrefix.cart}/${pathPrefix.user}/${userSessionStorage.getUserId()}/reserve-tickets`,
        ticketData
      )
      if (response.status === 200) {
        return true
      } else {
        console.error('Error al reservar el ticket:', response.status)
        return false
      }
    } catch (error) {
      console.error('Error al reservar el ticket:', error)
      return false
    }
  } 

  async removeReservedTickets() {
    return await axios.put(
      `${REST_SERVER_URL}/${pathPrefix.cart}/${pathPrefix.user}/${userSessionStorage.getUserId()}/remove-reserved-tickets`,
    )
  }

  async reservedTicketsPrice(): Promise<number> {
    const price = await axios.get<number>(
      `${REST_SERVER_URL}/${pathPrefix.cart}/${pathPrefix.user}/${userSessionStorage.getUserId()}/reserved-tickets-price`,
    )
    return price.data
  }
}

export const cartService = new CartService()
