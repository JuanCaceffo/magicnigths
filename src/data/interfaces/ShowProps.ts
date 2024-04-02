export interface ShowProps {
  id: number
  showImg: string
  showName: string
  bandName: string
  facilityName: string
  geoLocation: string
  rating: number
  totalComments: number
  price?: number
  prices?: number[]
  dates: { date: string; soldout: boolean }[]
  userImageNames: string[]
  comments: { imgProfile: string; name: string; date: string; rating: number; text: string }[]
  seats: { seatType: string; price: number }[]
}
