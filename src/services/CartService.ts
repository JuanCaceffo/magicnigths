import axios from 'axios'
import { REST_SERVER_URL, pathPrefix } from './contants'
import { ShowProps } from 'src/data/interfaces/ShowProps'
import { Show } from 'src/data/model/Show'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'

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
