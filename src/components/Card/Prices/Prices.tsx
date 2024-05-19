import { Show } from 'models/Show'

interface PricesProps {
  show: Show
}

export const Prices = ({ show }: PricesProps) => {
  return (
    <p data-testid="show-price">
      {show.isPurchaced()
        ? `Valor:  $ ${Math.round(show.price)}`
        : `Desde ${show
            .reducedPrices()
            .map((price) => `$ ${price}`)
            .join(' a ')}`}
    </p>
  )
}
