import moment from 'moment'
import { ShowProps } from '../interfaces/ShowProps'
import { CommentDTO } from '../interfaces/CommentDTO'

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
  }

  LIMIT_FRIENDS = 3

  get title() {
    return `${this.bandName} - ${this.showName}`
  }

  getMinMaxPrices = () => (this.prices ? [Math.min(...this.prices), Math.max(...this.prices)] : [])

  getLimitedUserImgs = () =>
    this.pasedLimitFriends()
      ? this.userImageNames.slice(0, this.LIMIT_FRIENDS)
      : this.userImageNames.slice(0, this.userImageNames.length)

  pasedLimitFriends = () => this.userImageNames.length > this.LIMIT_FRIENDS

  restFriends = () => this.pasedLimitFriends() && this.userImageNames.length - this.LIMIT_FRIENDS

  wasPricePaid = () => !!this.price
}
