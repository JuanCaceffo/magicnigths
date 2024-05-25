import './CardStats.scss'
import { Colors } from 'models/interfaces/ShowProps'

interface CardStatsProps {
  title: string
  info: number | string
  color: Colors
  className?: string
}

export const CardStats = (props: CardStatsProps) => {
  const { title = '', info = '', color = 'RED', className } = props

  return (
    <article data-testid="cardStats" className={`card-stats ${color.toLowerCase()} shadow shadow--box ${className}`}>
      <section className="text--stronger text--md text--clear"> {title} </section>
      <section className="text--clear text--strong"> {`${info}`} </section>
    </article>
  )
}
