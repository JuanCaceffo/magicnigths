import './CardStats.scss'

export enum CardColor {
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
  CLEAR = 'clear'
}

interface CardStatsProps {
  title: string
  info: string
  color: CardColor
}

export const CardStats = (props: CardStatsProps) => {
  const { title = "", info = "", color = CardColor.CLEAR } = props

  return (
    <article
      data-testid="cardStats"
      className={`card-stats ${color} shadow shadow--box`}
    >
      <section className='text--light'> {title} </section>
      <section className='text--strong'> {info} </section>
    </article>
  )
}

