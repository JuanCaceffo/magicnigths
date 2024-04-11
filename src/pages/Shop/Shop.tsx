import { useEffect, useState } from 'react'
import CardShow from 'src/components/Card/CardShow/CardShow'
import { Show } from 'src/data/model/Show'
import './Shop.scss'
import { AxiosError } from 'axios'
import { cartService } from 'src/services/CartService'
import { Page } from '../Page/Page'
import { errorHandler } from 'src/data/helpers/ErrorHandler'
import { enqueueSnackbar, closeSnackbar } from 'notistack'

export const Shop = () => {
  const [ticketsShow, setTicketsShow] = useState<Show[]>([])
  const [price, setPrice] = useState<number>(0)

  const fetchTicketData = async () => {
    cartService.reservedTicketsPrice().then((price) => {
      setPrice(price)
    })
    cartService.getReservedTickets().then((data) => {
      setTicketsShow(data)
    })
  }

  useEffect(() => {
    fetchTicketData()
    return () => {
      closeSnackbar()
    }
  }, [])

  const pruchaseTickets = async () => {
    cartService
      .pruchaseReservedTickets()
      .then(() => {
        enqueueSnackbar('La compra fue realizada con exito', { variant: 'success' })
        fetchTicketData()
      })
      .catch((error: AxiosError) => {
        enqueueSnackbar(errorHandler(error))
      })
  }

  const removeAllReservedTickets = async () => {
    await cartService.removeReservedTickets().then(() => {
      enqueueSnackbar('La tickets del carrito fueron eliminados con exito', { variant: 'success' })
      fetchTicketData()
    })
  }

  return (
    <Page
      content={
        <main className="main__content shop">
          <article className="shop__content">
            <header className="text--xl">Carrito de compras</header>
            <section className="main__content--grid">
              {ticketsShow.map((show) => (
                <CardShow show={show} quantity={show.quantity} />
              ))}
            </section>
          </article>
          <footer className="shop__footer">
            <span className="text--md">TOTAL ${price}</span>
            <section className="shop__buttons">
              <button
                className="shop__button button button--primary button--tall button--rounded animated shadow shadow--box"
                onClick={pruchaseTickets}
              >
                Confirmar pedido
              </button>
              <button
                className="shop__button button button--secondary button--tall button--rounded animated shadow shadow--box"
                onClick={removeAllReservedTickets}
              >
                Limpiar carrito
              </button>
            </section>
          </footer>
        </main>
      }
    />
  )
}
