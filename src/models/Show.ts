import { ShowProps } from 'models/interfaces/ShowProps'
import { CommentDTO } from 'models/interfaces/CommentDTO'
import { format } from 'date-fns'
import { ShowDate } from './ShowDate'

export class Show {
  id: number
  ticketId: number
  showImg: string
  showName: string
  bandName: string
  facilityName: string
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
  adminSummary: { title: string; value: number }[]
  canBeCommented: boolean
  showedImages: number = 0
  isSoldOut: boolean

  constructor(props?: ShowProps) {
    this.id = props?.id ?? 0
    this.showImg = props?.showImg ?? 'default.jpg'
    this.showName = props?.showName ?? ''
    this.bandName = props?.bandName ?? ''
    this.facilityName = props?.facilityName ?? ''
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
    this.adminSummary = props?.adminSummary ?? []
    this.ticketId = props?.ticketId ?? 0
    this.canBeCommented = props?.canBeCommented ?? false
    this.isSoldOut = props?.isSoldOut ?? false
  }

  get title() {
    return `${this.bandName} - ${this.showName}`
  }

  reducedPrices = (decimals: number = 0) =>
    this.prices ? [Math.min(...this.prices).toFixed(decimals), Math.max(...this.prices).toFixed(decimals)] : []

  get totalFriends() {
    return this.totalFriendsAttending - this.friendsImgs?.length
  }

  get restFriends() {
    const rest = this.totalFriends - this.showedImages
    return rest > 0 ? rest : 0
  }

  isPurchaced = () => this.prices.length == 1

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
