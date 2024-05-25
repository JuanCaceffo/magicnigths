import './Shop.scss'
import { useState } from 'react'
import { CardShow } from 'components/Card/CardShow/CardShow'
import { Show } from 'models/Show'
import { AxiosError } from 'axios'
import { cartService } from 'services/CartService'
import { Page } from '../Page/Page'
import { errorHandler } from 'models/helpers/ErrorHandler'
import { enqueueSnackbar, closeSnackbar } from 'notistack'
import { useOnInit } from 'hooks/hooks'

export const Shop = () => {
  const [ticketsShow, setTicketsShow] = useState<Show[]>([])
  const [total, setTotal] = useState<number>(0)

  const fetchTicketData = async () => {
    cartService
      .getTotal()
      .then((price) => {
        setTotal(price)
      })
      .catch((err) => enqueueSnackbar(errorHandler(err)))
    cartService
      .getUserCart()
      .then((data) => {
        setTicketsShow(data)
      })
      .catch((err) => enqueueSnackbar(errorHandler(err)))
  }

  useOnInit(() => {
    fetchTicketData()
    return () => {
      closeSnackbar()
    }
  })

  const pruchaseTickets = async () => {
    cartService
      .buy()
      .then(() => {
        enqueueSnackbar('La compra fue realizada con exito', { variant: 'success' })
        fetchTicketData()
      })
      .catch((error: AxiosError) => {
        enqueueSnackbar(errorHandler(error))
      })
  }

  const clearCart = async () => {
    await cartService.clearCart().then(() => {
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
            <span className="text--md">TOTAL ${total.toFixed(2)}</span>
            <section className="shop__buttons">
              <button
                className="shop__button button button--primary button--tall button--rounded animated shadow shadow--box"
                onClick={pruchaseTickets}
              >
                Confirmar pedido
              </button>
              <button
                className="shop__button button button--secondary button--tall button--rounded animated shadow shadow--box"
                onClick={clearCart}
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
