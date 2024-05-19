import axios from 'axios'
import { REST_SERVER_URL, PATH } from './contants'
import { ShowProps } from 'models/interfaces/ShowProps'
import { Show } from 'models/Show'
import { userSessionStorage } from 'models/helpers/userSessionStorage'
import { Ticket } from 'models/Ticket'
class CartService {
  cartPathPrefix = () => `${REST_SERVER_URL}/${PATH.CART}/${PATH.USER}/${userSessionStorage.getUserId()}`

  async getReservedTickets(): Promise<Show[]> {
    const showPropsList = await axios.get<ShowProps[]>(`${this.cartPathPrefix()}/reserved-tickets`)
    return showPropsList.data.map((props) => new Show(props))
  }

  async buyReservedTickets() {
    return await axios.patch(`${this.cartPathPrefix()}/buy-reserved-tickets`)
  }

  async addReservedTicket(ticketData: Ticket) {
    return await axios.patch(`${this.cartPathPrefix()}/reserve-tickets`, ticketData)
  }

  async removeReservedTickets() {
    return await axios.delete(`${this.cartPathPrefix()}/remove-reserved-tickets`)
  }

  async reservedTicketsPrice(): Promise<number> {
    const price = await axios.get<number>(`${this.cartPathPrefix()}/reserved-tickets-price`)
    return price.data
  }
}

export const cartService = new CartService()
