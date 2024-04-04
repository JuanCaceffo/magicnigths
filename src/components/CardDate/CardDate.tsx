import './CardDate.scss'
import { format } from 'date-fns'

interface CardDateProps {
  date: Date
  isSelected?: boolean
  isDisable?: boolean
  handleClick: (value: Date) => void
}

const CardDate = (props: CardDateProps) => {
  const { date, isSelected = false, isDisable = false, handleClick } = props

  return (
    <article
      data-testid="cardDate"
      className={`card-date flex text--md ${isSelected ? 'card-date--active' : ''} ${isDisable ? 'card-date--disabled' : ''}`}
      onClick={() => handleClick!!(date)}
    >
      <section className="flex">
        <strong className="card-date__day">{format(date, 'eeee')}</strong>
        <strong className="card-date__day-month">{format(date, 'dd/MM')}</strong>
      </section>
      <span className="card-date__hs">{format(date, 'k:m')}</span>
    </article>
  )
}

export default CardDate
