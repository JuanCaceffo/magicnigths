import moment from 'moment'
import { ShowProps } from '../interfaces/ShowProps'
import { CommentDTO } from '../interfaces/CommentDTO'
import { format } from 'date-fns'

//TODO: when the imgs managment will finished in the backend change here if is necesary
export class Show implements ShowProps {
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
  dates!: Date[]
  quantity?: number
  geolocation?: string
  canBeCommented: boolean
  showedImages: number = 0
  details: { title: string; description: string }[]
  constructor(private props: ShowProps) {
    this.id = this.props.id ?? ''
    this.showImg = this.props.showImg ?? 'default.jpg'
    this.showName = this.props.showName ?? ''
    this.bandName = this.props.bandName ?? ''
    this.facilityName = this.props.facilityName ?? ''
    this.rating = this.props.rating ?? 0
    this.totalComments = this.props.totalComments ?? 0
    this.price = this.props.price ?? 0
    this.prices = this.props.prices ?? []
    this.userImageNames = this.props.userImageNames ?? []
    this.comments = this.props.comments ?? []
    this.dates = this.props.dates.map((date) => moment.utc(date).toDate())
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

  firstDate = () =>
    new Date(
      Math.min.apply(
        null,
        this.dates.map((date) => date.getTime()),
      ),
    )

  lastDate = () =>
    new Date(
      Math.max.apply(
        null,
        this.dates.map((date) => date.getTime()),
      ),
    )

  get reducedDates(): string[] {
    return this.dates ? [format(this.firstDate(), 'MM/dd'), format(this.lastDate(), 'MM/dd')] : []
  }
}
