export interface ShowProps {
  id: number // showdetails
  showImg: string // showdetails
  showName: string // showdetails
  bandName: string // showdetails
  facilityName: string // showdetails
  geoLocation?: string // showdetails
  rating?: number
  totalComments?: number
  price?: number
  prices?: number[]
  dates: { date: string; soldout: boolean }[] // showdetails
  userImageNames?: string[]
  comments?: { imgProfile: string; name: string; date: string; rating: number; text: string }[] // showdetails
  seats?: { seatType: string; price: number; maxToSell: number }[] // showdetails
}
