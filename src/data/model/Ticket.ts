

// export interface SeatArgs {
//   id: number
//   seatType: SeatTypes
//   price: number
//   maxToSell: number
//   reservedQuantity: number
//   disabled: boolean
// }

// export class Ticket implements TicketArgs {
//   id: number
//   seatType: SeatTypes
//   price: number
//   maxToSell: number
//   reservedQuantity: number
//   disabled: boolean

//   constructor(data: SeatArgs) {
//     this.id = data.id ?? -1
//     this.seatType = (data.seatType as SeatTypes) ?? 'undefined'
//     this.price = data.price ?? 0
//     this.maxToSell = data.maxToSell ?? 10
//     this.reservedQuantity = data.reservedQuantity ?? 0
//     this.disabled = data.disabled ?? false
//   }

//   static fromJSON(data: SeatArgs): Seat {
//     return new Seat(data)
//   }
// }