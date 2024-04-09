import { Show } from 'src/data/model/Show'
import './CardShowAdmin.scss'

interface CardShowAdminProps {
  show: Show
}

export const CardShowAdmin = (props: CardShowAdminProps) => {
  const { show } = props

  return (
    <article className={`card-admin shadow shadow--box`}>
      <section className="card-admin__img-container">
        <img className="card-admin__img" src={`/images/${show.showImg}`} />
      </section>
      <section className="card-admin__info">
        <p className="card-admin__title">{`${show.bandName} - ${show.showName}`}</p>
        <p className="card-admin__text">{`Ubicación: ${show.facilityName}`}</p>
        <p className="card-admin__text">{`Intervalo de fechas: ${show.reducedDates}`}</p>
        <p className="card-admin__text">
          {`Desde: ${show
            .getMinMaxPrices()
            .map((price) => `$${price}`)
            .join(' - Hasta: ')}`}
        </p>
      </section>
    </article>
  )
}
