import { SeatTypes } from 'models/interfaces/SeatTypes'

interface TicketProps {
  showId: number
  date: Date
  seatPrice: number
  seatTypeName: SeatTypes
  quantity: number
}

export class Ticket implements TicketProps {
  showId: number
  date: Date
  seatPrice: number
  seatTypeName: SeatTypes
  quantity: number

  constructor(data: TicketProps) {
    this.showId = data.showId ?? -1
    this.date = data.date ?? -1
    this.seatPrice = data.seatPrice ?? 0
    this.seatTypeName = data.seatTypeName ?? ''
    this.quantity = data.quantity ?? 0
  }

  static toJson = (data: TicketProps) => new Ticket(data)
}
