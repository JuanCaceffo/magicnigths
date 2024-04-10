import './CardShow.scss'
import { useState } from 'react'
import { Show } from 'src/data/model/Show'
import { Prices } from '../Prices/Prices'

interface buttonProps {
  content: string
  onClick: (id: number) => void
  className?: string
}

interface CardShowProps {
  show: Show
  button?: buttonProps
  quantity?: number
}

const CardShow = (props: CardShowProps) => {
  const { show, button, quantity = 0 } = props
  const [showButton, setShowButton] = useState(false)

  const qty = () => {
    return (
      quantity > 1 && (
        <p className="card__qty text text--md text--stronger text--clear shadow--text-over" data-testid="show-amount">
          {`x${quantity}`}
        </p>
      )
    )
  }

  const star = () => {
    return (
      <>
        {show.rating < 1 ? (
          <i className="fas fa-star fa--rp fa--low" />
        ) : //
        show.rating < 4 ? (
          <i className="fas fa-star fa--rp fa--medium" />
        ) : (
          <>
            <i className="fas fa-star fa--rp fa--up" />
            <i className="fas fa-fire fa--rp fa--hot" />
          </>
        )}
      </>
    )
  }

  const friends = () => {
    return (
      <section className="card__friends centered">
        <span className="text--strong">Asisten:</span>
        <span className="card__friends--img">
          {show.takeImages(3).map((path) => (
            <img key={path} className="profile-img profile-img__small shadow--png" src={`/images/${path}`} />
          ))}
        </span>
        {<span data-testid="more-friends">{!!show.restFriends ? `+ ${show.restFriends} amigos` : 'amigos'}</span>}
      </section>
    )
  }

  const actionButton = () => {
    return (
      button && (
        <button
          className={`button button--primary button--rounded button--tall button--medium animated text--strong text--spaced shadow--box ${button.className}`}
          data-testid="show-button"
          onClick={() => button.onClick(show.id)}
        >
          {button.content.toUpperCase()}
        </button>
      )
    )
  }

  return (
    <main
      className="card text shadow shadow--big"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <header className="card__header">
        <img className="card__img" src={`/images/${show.showImg}`} />
        <span className="card__rating text--stronger">
          {star()}
          {`${show.rating} (${show.totalComments})`}
        </span>
        {qty()}
      </header>
      <section className="card__content">
        <header className="card__content-header text--stronger centered">
          <span>{`${show.bandName.toUpperCase()}`}</span>
          <span>|</span>
          <span>{`${show.showName}`}</span>
        </header>

        <div className="card__content-body">
          <span className="card__text">
            <p className="text--strong">Ubicación: </p>
            <p>{show.facilityName}</p>
          </span>
          <span className="card__text card__text--right ">
            <p className="text--strong">Fechas: </p>
            <p>{show.reducedDates}</p>
          </span>
        </div>
        {!!show.totalFriends ? friends() : <p className="card__friends centered">No asisten amigos</p>}

        <footer className="card__footer text--md text--strong centered">
          {showButton && button ? actionButton() : <Prices show={show} />}
        </footer>
      </section>
    </main>
  )
}

export default CardShow
