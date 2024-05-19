import { SeatTypes } from 'models/interfaces/SeatTypes'

export interface SeatArgs {
  id: number
  seatType: SeatTypes
  price: number
  available: number
  reservedQuantity?: number
  disabled?: boolean
}

export class Seat implements SeatArgs {
  id: number
  seatType: SeatTypes
  price: number
  available: number
  reservedQuantity: number
  disabled: boolean

  constructor(data: SeatArgs) {
    this.id = data.id ?? 0
    this.seatType = (data.seatType as SeatTypes) ?? 'undefined'
    this.price = data.price ?? 0
    this.available = data.available ?? 0
    this.reservedQuantity = data.reservedQuantity ?? 0
    this.disabled = data.disabled ?? false
  }

  static fromJSON(data: SeatArgs): Seat {
    return new Seat(data)
  }
}
