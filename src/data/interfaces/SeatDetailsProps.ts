export interface SeatDetailProps {
  date: Date
  seats: SeatProps[]
}

export interface SeatProps {
  seatType: SeatTypes
  price: number
  maxToSell: number
}

export enum SeatTypes {
  'PULLMAN',
  'UPPERLEVEL',
  'LOWERLEVEL',
  'FIELD',
  'BOX',
}
