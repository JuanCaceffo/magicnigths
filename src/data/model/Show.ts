import { ShowProps } from '../interfaces/ShowProps'
import { CommentDTO } from '../interfaces/CommentDTO'
import { format } from 'date-fns'
import { ShowDate } from './ShowDate'

//TODO: when the imgs managment will finished in the backend change here if is necesary
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
  userImageNames: string[]
  comments: CommentDTO[]
  geolocation: string
  quantity: number
  details: { title: string; description: string }[]
  canBeCommented: boolean
  showedImages: number = 0

  constructor(props?: ShowProps) {
    this.id = props?.data.id ?? 0
    this.showImg = props?.data.showImg ?? 'default.jpg'
    this.showName = props?.data.showName ?? ''
    this.bandName = props?.data.bandName ?? ''
    this.facilityName = props?.data.facilityName ?? ''
    this.price = props?.price ?? 0
    this.prices = props?.prices ?? []
    this.rating = props?.showStats?.rating ?? 0
    this.totalComments = props?.showStats?.totalComments ?? 0
    this.date = props?.date ? new ShowDate(props.date) : undefined
    this.dates = props?.dates?.map((showDate) => new ShowDate(showDate)) ?? []
    this.userImageNames = props?.showStats?.userImageNames ?? []
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

  takeImages = (amount: number = 1): string[] => {
    this.showedImages = amount
    return this.userImageNames?.slice(0, amount) ?? []
  }

  get totalFriends() {
    return this.userImageNames?.length ?? 0
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
