import { Show } from 'src/data/model/Show'
import './CardShowAdmin.scss'
import { Prices } from '../Prices/Prices'
import { useNavigate } from 'react-router'

interface CardShowAdminProps {
  show: Show
  isSelected: boolean
  onSelect?: () => void
}

export const CardShowAdmin = (props: CardShowAdminProps) => {
  const { show, onSelect, isSelected } = props
  const navigate = useNavigate()

  const handleClick = (id: number) => {
    navigate(`/admin_dashboard/show/${id}`)
  }

  return (
    <article className={`card-admin ${isSelected && 'card-admin--active'} shadow shadow--box`} onClick={onSelect}>
      <img className="card-admin__img" src={`/images/${show.showImg}`} />
      <section className="card-admin__info">
        <p className="card-admin__title">{`${show.bandName} - ${show.showName}`}</p>
        <p className="card-admin__text">{`Ubicación: ${show.facilityName}`}</p>
        <p className="card-admin__text">{`Intervalo de fechas: ${show.reducedDates}`}</p>
        <p className="card-admin__text">{<Prices show={show} />}</p>
      </section>
      {isSelected && (
        <button
          className="card-admin__button button button--rounded button--small button--primary animated shadow--box"
          onClick={() => handleClick(show.id)}
        >
          Detalles
        </button>
      )}
    </article>
  )
}
