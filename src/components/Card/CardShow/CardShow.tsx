import './CardShow.scss'
import { useState } from 'react'
import { Show } from 'src/data/model/Show'

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
  const { content, onClick, className = '' } = button!!
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
    return !!show.totalFriends ? (
      <section className="card__friends centered">
        <span className="text--strong">Asisten:</span>
        <span className="card__friends--img">
          {show.takeImages(3).map((path) => (
            <img key={path} className="profile-img profile-img__small shadow--png" src={`/images/${path}`} />
          ))}
        </span>
        {<span data-testid="more-friends">{!!show.restFriends ? `+ ${show.restFriends} amigos` : 'amigos'}</span>}
      </section>
    ) : (
      <>'No asisten amigos'</>
    )
  }

  const price = () => {
    return (
      <p data-testid="show-price">
        {show.isPurchaced()
          ? `Valor:  $ ${show.price}`
          : `Desde ${show
              .reducedPrices()
              .map((price) => `$ ${price}`)
              .join(' a ')}`}
      </p>
    )
  }

  const buyButton = () => {
    return (
      button && (
        <button
          className={`button button--primary button--rounded button--tall button--medium animated text--strong text--spaced shadow--box ${className}`}
          data-testid="show-button"
          onClick={() => onClick(show.id)}
        >
          {content.toUpperCase()}
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
          <article className="card-show__fileld"></article>
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
        {friends()}

        <footer className="card__footer text--md text--strong centered">
          {showButton && button ? buyButton() : price()}
        </footer>
      </section>
    </main>
  )
}

export default CardShow
