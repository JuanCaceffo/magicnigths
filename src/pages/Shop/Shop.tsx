import { useEffect, useState } from 'react'
import CardShow from 'src/components/Card/CardShow/CardShow'
import { Show } from 'src/data/model/Show'
import './Shop.scss'
import { AxiosError } from 'axios'
import { cartService } from 'src/services/CartService'
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
      console.log('Lanzar snackbar avisando que los tickets se removieron con exito')
      fetchTicketData()
    })
  }

  return (
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
          <button className="shop__button button" onClick={pruchaseTickets}>
            Confirmar pediodo
          </button>
          <button className="shop__button button button__secondary" onClick={removeAllReservedTickets}>
            Limpiar carrito
          </button>
        </section>
      </footer>
    </main>
  )
}
