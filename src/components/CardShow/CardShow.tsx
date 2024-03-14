import { FC, ReactNode } from 'react'
import './CardShow.css'
import StarIcon from '@mui/icons-material/Star'
import { Show } from 'src/data/model/Show'

interface CardShowProps {
  show: Show
  button?: ReactNode
}

const CardShow: FC<CardShowProps> = ({ show, button }) => {
  const fomratedDates = () =>
    show.dates
      .map((date) => new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'numeric' }).format(date))
      .join(' - ')

  return (
    <>
      <main className="card-show">
        <header className="card-show__header">
          <img className="card-show__img" src="/mock-imgs/card-show-imgs/velapuerca.jpg" alt="" />
        </header>
        <section className="card-show__cont card-show--flex">
          <header className="card-show--flex">
            <span className="card-show__fileld">{show.name}</span>
            <article className="card-show__fileld">
              <StarIcon fontSize="small"></StarIcon>
              <b>{show.valoration}</b>
              <span>({show.valorationSize})</span>
            </article>
          </header>
          <div className="card-show--flex">
            <article className="card-show__fileld">
              <span>
                <b>Ubicacion: </b>
                {show.ubication}
              </span>
            </article>
            <span className="card-show__fileld">{`fechas ${fomratedDates()}`}</span>
          </div>
          <div className="card-show--flex">
            {!!show.userImgs.length && (
              <article className="card-show__friends card-show--flex">
                <span>Tambien van a asistir</span>
                <div className="card-show__user-img-cnt">
                  {show.getLimitedUserImgs().map((path) => (
                    <img className="card-show__user-img" src={path}></img>
                  ))}
                </div>
                {show.pasedLimitFriends() && <span data-testid="more-friends">+ {show.restFriends()} amigos</span>}
              </article>
            )}
          </div>
          <footer className="card-show--flex">
            <span className="card-show__fileld">
              {show.wasPricePaid()
                ? `Precio pagado  $${show.price}`
                : show.pricePaid && `Desde ${show.pricePaid.join(' a ')}`}
            </span>
            {button && button}
          </footer>
        </section>
      </main>
    </>
  )
}

export default CardShow
