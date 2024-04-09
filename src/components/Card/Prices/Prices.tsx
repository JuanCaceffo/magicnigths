import { Show } from 'src/data/model/Show'

interface PricesProps {
  show: Show
}

export const Prices = ({ show }: PricesProps) => {
  return (
    <p data-testid="show-price">
      {show.isPurchaced()
        ? `Valor:  $ ${show.price}`
        : `Desde ${show
            .reducedPrices()
            .map((price) => `$ ${price}`)
            .join(' a ')}`}
    </p>
  )
}
