import axios from 'axios'
import { REST_SERVER_URL, PATH } from './contants'
import { ShowProps } from 'models/interfaces/ShowProps'
import { Show } from 'models/Show'
import { userSessionStorage } from 'models/helpers/userSessionStorage'
import { Ticket } from 'models/Ticket'
import { TicketBuyProps } from 'models/interfaces/ticketBuy'
class CartService {
  cartPathPrefix = `${REST_SERVER_URL}/${PATH.CART}/${PATH.USER}/${userSessionStorage.getUserId()}`

  getUserCart = async () => {
    const ticketsJson = await axios.get<ShowProps[]>(this.cartPathPrefix)
    return ticketsJson.data.map((props) => new Show(props))
  }

  clearCart = async () => {
    return await axios.delete(`${this.cartPathPrefix}/clear`)
  }

  buy = async () => {
    return await axios.patch(`${this.cartPathPrefix}/buy`)
  }

  reserve = async (tickets: TicketBuyProps[]) => {
    return await axios.post(`${this.cartPathPrefix}/add`, tickets)
  }

  getTotal = async () => {
    const price = await axios.get<number>(`${this.cartPathPrefix}/total_price`)
    return price.data
  }
}

export const cartService = new CartService()
