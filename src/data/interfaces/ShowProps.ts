export interface ShowProps {
  id: number
  showImg: string
  showName: string
  bandName: string
  facilityName: string
  rating?: number
  totalComments?: number
  price?: number
  prices?: number[]
  dates: Date[]
  userImageNames?: string[]
  comments?: Comment[]
}
