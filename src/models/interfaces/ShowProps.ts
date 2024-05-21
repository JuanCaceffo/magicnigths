import { ShowDate } from 'models/ShowDate'
import { CommentDTO } from './CommentDTO'
import { UUID } from 'crypto'

export interface ShowData {
  id: number
  showImg: string
  showName: string
  bandName: string
  facilityName: string
}

export interface ShowStats {
  rating?: number
  totalComments?: number
  friendsImgs?: string[]
}

export interface ShowProps {
  id: number
  showImg: string
  showName: string
  bandName: string
  facilityName: string
  rating?: number
  totalComments?: number
  friendsImgs?: string[]
  totalFriendsAttending?: number
  price?: number
  prices?: number[]
  date?: ShowDate
  dates?: ShowDate[]
  ticketId?: number
  comments?: CommentDTO[]
  geolocation?: string
  quantity?: number
  canBeCommented?: boolean
  details?: { title: string; description: string }[]
}

export interface ShowStatsProps {
  id: UUID
  value: number
  color: Colors
}
export type Colors = 'RED' | 'YELLOW' | 'GREEN'
