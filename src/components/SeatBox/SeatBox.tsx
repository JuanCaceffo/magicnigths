import { SeatArgs } from 'src/data/model/Seat'
import './SeatBox.scss'
import { NumPicker } from '../NumPicker/NumPicker'

interface SeatBoxArgs {
  value: number
  handler: (newValue: number) => void
  seatArgs: SeatArgs
}

export const SeatBox = (args: SeatBoxArgs) => {
  const { value = 0, handler, seatArgs } = args
  return (
    <section className="seat-box">
      <span className="seat-box__seat-type text--stronger">{seatArgs.seatType}</span>
      <span>$ {seatArgs.price}</span>
      <span>{<NumPicker value={value} handler={handler} max={seatArgs.maxToSell} min={0} />}</span>
    </section>
  )
}
