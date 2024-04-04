import { useState } from 'react'
import CardShow from 'src/components/CardShow/CardShow'
import { Header } from 'src/components/Header/Header'
import { Show } from 'src/data/model/Show'
import { Page } from 'src/pages/Page/Page'
import './Shop.scss'

export const Shop = () => {
  const [ticketsShow, setTicketsShow] = useState<Show[]>([])

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
              <button className="shop__button button">Confirmar pediodo</button>
              <button className="shop__button button button__secondary">Limpiar carrito</button>
            </section>
          </footer>
        </main>
      }
    />
  )
}
