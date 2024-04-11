import { CommentDTO } from './CommentDTO'

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
  details?: { title: string; description: string }[]
}

export interface ShowStatsProps {
  id: number
  value: number
  color: Colors
}
export type Colors = 'red' | 'yellow' | 'green'
