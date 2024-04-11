import { Show } from 'src/data/model/Show'
import './CardShowAdmin.scss'
import { Prices } from '../Prices/Prices'

interface CardShowAdminProps {
  show: Show
  onSelect?: () => void
}

export const CardShowAdmin = (props: CardShowAdminProps) => {
  const { show, onSelect } = props

  const handleClick = () => {
    if (onSelect) {
      onSelect()
    }
  }

  return (
    <article className={`card-admin shadow shadow--box`} onClick={handleClick}>
      <img className="card-admin__img" src={`/images/${show.showImg}`} />
      <section className="card-admin__info">
        <p className="card-admin__title">{`${show.bandName} - ${show.showName}`}</p>
        <p className="card-admin__text">{`Ubicación: ${show.facilityName}`}</p>
        <p className="card-admin__text">{`Intervalo de fechas: ${show.reducedDates}`}</p>
        <p className="card-admin__text">{<Prices show={show} />}</p>
      </section>
    </article>
  )
}
