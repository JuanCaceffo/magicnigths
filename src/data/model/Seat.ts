import { SeatDetailProps, SeatProps } from '../interfaces/SeatDetailsProps'

export class Seat implements SeatDetailProps {
  date: Date
  seats: SeatProps[]

  constructor(data: SeatDetailProps) {
    this.date = data.date
    this.seats = data.seats
  }

  static fromJSON = (data: SeatDetailProps) => new Seat(data)
}
