import './CardDate.scss'
import { format } from 'date-fns'
import { FC } from 'react'

interface CardDateProps {
  date: Date
  isSelected?: boolean
  isDisable?: boolean
}

const CardDate: FC<CardDateProps> = ({ date, isSelected = false, isDisable = false }) => {
  return (
    <article
      data-testid="cardDate"
      className={`card-date flex text--md ${isSelected ? 'card-date--active' : ''} ${isDisable ? 'card-date--disabled' : ''}`}
    >
      <section className="flex">
        <strong>{format(date, 'eeee')}</strong>
        <strong>{format(date, 'dd/MM')}</strong>
      </section>
      <span>{format(date, 'k:m')}</span>
    </article>
  )
}

export default CardDate
