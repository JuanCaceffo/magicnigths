import { CommentDTO } from "./CommentDTO"

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
  comments?: CommentDTO[]
  geolocation?: string
  quantity?: number
  canBeCommented?: boolean
}

export interface ShowStatsProps{
  id: number
  totalSales: number
  pendingAttendees: number
  rentability: number
  soldOutDates: number
  baseCost: number
}
