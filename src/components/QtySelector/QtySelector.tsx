import './QtySelector.scss'

interface QtySelectorProps {
  handleInputChange: () => void
  value: number | undefined
  name: string
  price: number
  maxQuantity: number
}

export const QtySelector = ({ ...props }: QtySelectorProps) => {

  return (
    <>
      <div className="quantitySelector">
        <span className="quantitySelector__name">{props.name}</span>
        <span className="quantitySelector__price">{props.price}</span>
        <input className="quantitySelector__maxQty" type="number" id="cantidad" name="cantidad" value={props.value ?? 0} min="0" max={props.maxQuantity} />
      </div>
    </>
  )
}

