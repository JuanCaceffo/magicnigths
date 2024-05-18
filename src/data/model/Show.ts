import { ShowProps } from '../interfaces/ShowProps'
import { CommentDTO } from '../interfaces/CommentDTO'
import { format } from 'date-fns'
import { ShowDate } from './ShowDate'

export class Show {
  id: number
  ticketId: number
  showImg: string
  showName: string
  bandName: string
  facilityName: string
  price: number
  prices: number[]
  rating: number
  totalComments: number
  date?: ShowDate
  dates: ShowDate[]
  friendsImgs: string[]
  totalFriendsAttending: number
  comments: CommentDTO[]
  geolocation: string
  quantity: number
  details: { title: string; description: string }[]
  canBeCommented: boolean
  showedImages: number = 0

  constructor(props?: ShowProps) {
    this.id = props?.id ?? 0
    this.showImg = props?.showImg ?? 'default.jpg'
    this.showName = props?.showName ?? ''
    this.bandName = props?.bandName ?? ''
    this.facilityName = props?.facilityName ?? ''
    this.price = Math.round(props?.price ?? 0)
    this.prices = props?.prices ?? []
    this.rating = props?.rating ?? 0
    this.totalComments = props?.totalComments ?? 0
    this.date = props?.date ? new ShowDate(props.date) : undefined
    this.dates = props?.dates?.map((showDate) => new ShowDate(showDate)) ?? []
    this.friendsImgs = props?.friendsImgs ?? []
    this.totalFriendsAttending = props?.totalFriendsAttending ?? 0
    this.comments = props?.comments ?? []
    this.geolocation = props?.geolocation ?? ''
    this.quantity = props?.quantity ?? 0
    this.details = props?.details ?? []
    this.ticketId = props?.ticketId ?? 0
    this.canBeCommented = props?.canBeCommented ?? false
  }

  get title() {
    return `${this.bandName} - ${this.showName}`
  }

  reducedPrices = (decimals: number = 0) =>
    this.prices ? [Math.min(...this.prices).toFixed(decimals), Math.max(...this.prices).toFixed(decimals)] : []


  get totalFriends() {
    return (this.totalFriendsAttending - this.friendsImgs?.length)
  }

  get restFriends() {
    const rest = this.totalFriends - this.showedImages
    return rest > 0 ? rest : 0
  }

  isPurchaced = () => this.price

  get firstDate() {
    return this.dates?.length ? this.dates[0].date : ''
  }

  get lastDate() {
    return this.dates?.length ? this.dates[this.dates.length - 1].date : ''
  }

  get reducedDates(): string[] {
    return this.dates.length != 0 ? [format(this.firstDate, 'dd/MM'), ' al ', format(this.lastDate, 'dd/MM')] : []
  }
}
