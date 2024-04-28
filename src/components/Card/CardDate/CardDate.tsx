import { forwardRef } from 'react'
import './CardDate.scss'
import { format } from 'date-fns'

interface CardDateProps {
  date: Date
  isSelected?: boolean
  isDisable?: boolean
  handleClick?: (value: Date) => void
  className?: string
}

export const CardDate = forwardRef<HTMLDivElement, CardDateProps>((props: CardDateProps, ref) => {
  const { date, isSelected = false, isDisable = false, handleClick, className = '' } = props

  return (
    <article
      className={`card-date flex text--md ${isSelected ? 'card-date--active' : ''} ${isDisable ? 'card-date--disabled' : ''} ${className}`}
      onClick={() => handleClick!(date)}
      ref={ref}
      data-testid="cardDate"
    >
      <section className="centered centered--column">
        <strong className="card-date__day">{format(date, 'eeee')}</strong>
        <strong className="card-date__day-month">{format(date, 'dd/MM')}</strong>
      </section>
      <span className="card-date__hs">{format(date, 'kk:mm')} hs.</span>
    </article>
  )
})
