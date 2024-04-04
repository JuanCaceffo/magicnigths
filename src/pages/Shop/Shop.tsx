import { useEffect, useState } from 'react'
import CardShow from 'src/components/CardShow/CardShow'
import { Header } from 'src/components/Header/Header'
import { Show } from 'src/data/model/Show'
import { Page } from 'src/pages/Page/Page'
import './Shop.scss'
import { userService } from 'src/services/UserService'
import { AxiosError } from 'axios'

export const Shop = () => {
  const [ticketsShow, setTicketsShow] = useState<Show[]>([])

  useEffect(() => {
    const fetchTicketsShow = async () => {
      userService.getReservedTickets().then((data) => {
        setTicketsShow(data)
      })
    }
    fetchTicketsShow()
  }, [])

  const pruchaseTickets = async () => {
    userService
      .pruchaseReservedTickets()
      .then(() => {
        console.log('Lanzar snackbar felicitando la compra de tickets')
      })
      .catch((error: AxiosError) => {
        console.log(error)
        console.log('atrapar el error con componente de errores del back y lanzar snackbar')
      })
  }

  const removeAllReservedTickets = async () => {
    await userService.removeReservedTickets().then(() => {
      console.log('Lanzar snackbar avisando que los tickets se removieron con exito')
    })
  }

  return (
    <Page
      header={<Header />}
      content={
        <main className="main__content shop">
          <article className="shop__content">
            <header className="text--xl">Carrito de compras</header>
            <section className="main__content--grid">
              {ticketsShow.map((show) => (
                <CardShow show={show} amount={show.quantity} />
              ))}
            </section>
          </article>
          <footer className="shop__footer">
            <span className="text--md">TOTAL $XXXXX</span>
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
      }
    />
  )
}
