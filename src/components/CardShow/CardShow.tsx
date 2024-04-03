import { FC, MouseEvent } from 'react'
import './CardShow.css'
import StarIcon from '@mui/icons-material/Star'
import { Show } from 'src/data/model/Show'
import { Button, ButtonProps } from '@mui/material'

interface extButtonProps {
  content: string
  whenclick: (event?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  //DOCU https://mui.com/material-ui/api/button/
  muiBtnProps?: ButtonProps
}

interface CardShowProps {
  show: Show
  button?: extButtonProps
  amount?: number
}

const CardShow: FC<CardShowProps> = ({ show, button, amount }) => {
  const fomratedDates = () =>
    show.dates
      .map((date) => new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'numeric' }).format(date))
      .join(' - ')

  return (
    <>
      <main className="card-show">
        <header className="card-show__header">
          <img className="card-show__img" src={`/mock-imgs/card-show-imgs/${show.showImg}`} />
          {amount && (
            <strong data-testid="show-amount" className="card-show__amount body">
              X{amount}
            </strong>
          )}
        </header>
        <section className="card-show__cont card-show--flex">
          <header className="card-show--flex subtitle2">
            <span className="card-show__fileld">
              {show.showName}
              {show.bandName}
            </span>
            <article className="card-show__fileld">
              <StarIcon fontSize="small"></StarIcon>
              <b>{show.rating}</b>
              <span>({show.totalComments})</span>
            </article>
          </header>
          <div className="card-show--flex body">
            <article className="card-show__fileld">
              <span>
                <b>Ubicacion: </b>
                {show.facilityName}
              </span>
            </article>
            <span className="card-show__fileld">{`fechas ${fomratedDates()}`}</span>
          </div>
          <div className="card-show--flex body">
            {!!show.userImageNames.length ? (
              <article className="card-show__friends card-show--flex">
                <span>Tambien van a asistir</span>
                <div className="card-show__user-img-cnt">
                  {show.getLimitedUserImgs().map((path) => (
                    <img key={path} className="card-show__user-img" src={path}></img>
                  ))}
                </div>
                {show.pasedLimitFriends() && <span data-testid="more-friends">+ {show.restFriends()} amigos</span>}
              </article>
            ) : (
              'No asisten amigos'
            )}
          </div>
          <footer className="card-show--flex body">
            <strong data-testid="show-price" className="card-show__fileld card-show__price">
              {show.wasPricePaid()
                ? `Precio pagado  $${show.price}`
                : show.prices &&
                  `Desde ${show
                    .getMinMaxPrices()
                    .map((price) => `$${price}`)
                    .join(' a ')}`}
            </strong>
            {button && (
              <Button
                color="primary"
                variant="contained"
                size="small"
                {...button.muiBtnProps}
                className={`card-show__button button-primary ${button.muiBtnProps?.className}`}
                data-testid="show-button"
                children={button.content}
                onClick={(event) => {
                  button.whenclick(event)
                }}
              />
            )}
          </footer>
        </section>
      </main>
    </>
  )
}

export default CardShow
