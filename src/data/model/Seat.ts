import { SeatTypes } from '../interfaces/SeatTypes'

export interface SeatArgs {
  seatType?: SeatTypes
  price?: number
  maxToSell?: number
}

export class Seat implements SeatArgs {
  seatType: SeatTypes
  price: number
  maxToSell: number

  constructor(data: SeatArgs = {}) {
    this.seatType = (data.seatType as SeatTypes) ?? 'undefined'
    this.price = data.price ?? 0
    this.maxToSell = data.maxToSell ?? 10
  }

  static fromJSON(data: SeatArgs): Seat {
    return new Seat(data)
  }
}
