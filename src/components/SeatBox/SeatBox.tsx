import { Seat } from 'models/Seat'
import './SeatBox.scss'
import { NumPicker } from '../NumPicker/NumPicker'

interface SeatBoxArgs {
  seat: Seat
  isDisable: boolean
  handler: (seat: Seat) => void
}

export const SeatBox = (args: SeatBoxArgs) => {
  const { seat, handler, isDisable = false } = args
  const handleOnPicker = (value: number) => {
    if (!isDisable) {
      const newReserveState: Seat = { ...seat, reservedQuantity: value }
      handler(newReserveState)
    }
  }

  return (
    <section className={`seat-box ${isDisable && 'seat-box--disabled'}`}>
      <span className="seat-box__seat-type text--stronger">{seat.seatType}</span>
      <span>{`$ ${Math.round(seat.price)}`}</span>
      <span>{<NumPicker value={seat.reservedQuantity} handler={handleOnPicker} max={seat.available} min={0} />}</span>
    </section>
  )
}
