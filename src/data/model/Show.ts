import moment from 'moment'
import { ShowProps } from '../interfaces/ShowProps'
import { CommentDTO } from '../interfaces/CommentDTO'
import { format } from 'date-fns'
import { ShowDate, ShowDateProps } from './ShowDate'

//TODO: when the imgs managment will finished in the backend change here if is necesary
export class Show {
  id: number
  showImg: string
  showName: string
  bandName: string
  facilityName: string
  rating: number
  totalComments: number
  price: number
  prices: number[]
  userImageNames: string[]
  comments: CommentDTO[]
  dates!: ShowDate[]
  quantity?: number
  geolocation?: string
  canBeCommented: boolean
  showedImages: number = 0
  details: { title: string; description: string }[]

  constructor(private props: ShowProps) {
    this.id = this.props.data.id ?? ''
    this.showImg = this.props.data.showImg ?? 'default.jpg'
    this.showName = this.props.data.showName ?? ''
    this.bandName = this.props.data.bandName ?? ''
    this.facilityName = this.props.data.facilityName ?? ''
    this.prices = this.props.prices ?? []
    this.dates = this.props.dates.map((showDate) => new ShowDate({ id: showDate.id, date: showDate.date })) ?? []
    this.rating = this.props.rating ?? 0
    this.totalComments = this.props.totalComments ?? 0
    this.userImageNames = this.props.userImageNames ?? []
    this.price = this.props.price ?? 0
    this.comments = this.props.comments ?? []
    this.geolocation = this.props.geolocation ?? ''
    this.quantity = this.props.quantity ?? 0
    this.canBeCommented = props.canBeCommented ?? false
    this.details = this.props.details ?? []
  }

  get title() {
    return `${this.bandName} - ${this.showName}`
  }

  reducedPrices = (decimals: number = 0) =>
    this.prices ? [Math.min(...this.prices).toFixed(decimals), Math.max(...this.prices).toFixed(decimals)] : []

  takeImages = (amount: number = 1): string[] => {
    this.showedImages = amount
    return this.userImageNames.slice(0, amount)
  }

  get totalFriends() {
    return this.userImageNames.length
  }

  get restFriends() {
    const rest = this.totalFriends - this.showedImages
    return rest > 0 ? rest : 0
  }

  isPurchaced = () => !!this.price

  get firstDate() {
    return this.dates[0].date
  }

  get lastDate() {
    return this.dates[this.dates.length - 1].date
  }

  get reducedDates(): string[] {
    return this.dates ? [format(this.firstDate, 'dd/MM'), ' al ', format(this.lastDate, 'dd/MM')] : []
  }
}
