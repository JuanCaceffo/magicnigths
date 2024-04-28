import { CommentDTO } from './CommentDTO'

export interface ShowData {
  id: number
  showImg: string
  showName: string
  bandName: string
  facilityName: string
}

export interface ShowProps {
  data: ShowData
  rating?: number
  totalComments?: number
  userImageNames?: string[]
  price?: number
  prices?: number[]
  dates: Date[]
  comments?: CommentDTO[]
  geolocation?: string
  quantity?: number
  canBeCommented?: boolean
  details?: { title: string; description: string }[]
}

export interface ShowStatsProps {
  id: number
  value: number
  color: Colors
}
export type Colors = 'red' | 'yellow' | 'green'
