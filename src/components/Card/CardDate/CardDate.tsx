import { forwardRef } from 'react'
import './CardDate.scss'
import { format } from 'date-fns'
import { ShowDate } from 'src/data/model/ShowDate'

interface CardDateProps {
  showDate: ShowDate
  isSelected?: boolean
  isDisable?: boolean
  handleClick?: (value: ShowDate) => void
  className?: string
}

export const CardDate = forwardRef<HTMLDivElement, CardDateProps>((props: CardDateProps, ref) => {
  const { showDate, isSelected = false, isDisable = false, handleClick, className = '' } = props

  return (
    <article
      className={`card-date flex text--md ${isSelected ? 'card-date--active' : ''} ${isDisable ? 'card-date--disabled' : ''} ${className}`}
      onClick={() => handleClick!(showDate)}
      ref={ref}
      data-testid="cardDate"
    >
      <section className="centered centered--column">
        <strong className="card-date__day">{format(showDate.date, 'eeee')}</strong>
        <strong className="card-date__day-month">{format(showDate.date, 'dd/MM')}</strong>
      </section>
      <span className="card-date__hs">{format(showDate.date, 'kk:mm')} hs.</span>
    </article>
  )
})
