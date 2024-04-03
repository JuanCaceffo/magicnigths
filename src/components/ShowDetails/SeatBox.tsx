import { SeatArgs } from 'src/data/model/Seat'

export const SeatBox = (args: SeatArgs) => {
  const { seatType = '', price = 0, maxToSell = 10 } = args
  return (
    <section className="seat-box">
      <span className="seat-box__seat-type">{seatType}</span>
      <span className="seat-box__price">$ {price}</span>
      <span>{}</span>
    </section>
  )
}
