import moment from 'moment'
import { ShowProps } from '../interfaces/ShowProps'

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
  comments: Comment[]
  dates!: Date[]

  constructor(private props: ShowProps) {
    this.id = this.props.id
    this.showImg = this.props.showImg ?? 'default.jpg'
    this.showName = this.props.showName
    this.bandName = this.props.bandName
    this.facilityName = this.props.facilityName
    this.rating = this.props.rating ?? 0
    this.totalComments = this.props.totalComments ?? 0
    this.price = this.props.price ?? 0
    this.prices = this.props.prices ?? []
    this.userImageNames = this.props.userImageNames ?? []
    this.comments = this.props.comments ?? []
    this.dates = this.props.dates.map((date) => moment.utc(date).toDate())
  }

  LIMIT_FRIENDS = 3

  getMinMaxPrices = () => (this.prices ? [Math.min(...this.prices), Math.max(...this.prices)] : [])

  getLimitedUserImgs = () =>
    this.pasedLimitFriends()
      ? this.userImageNames.slice(0, this.LIMIT_FRIENDS)
      : this.userImageNames.slice(0, this.userImageNames.length)

  pasedLimitFriends = () => this.userImageNames.length > this.LIMIT_FRIENDS

  restFriends = () => this.pasedLimitFriends() && this.userImageNames.length - this.LIMIT_FRIENDS

  wasPricePaid = () => !!this.price

  // Devuelve si el show puede ser comentado o no
  canBeComment = () => this.dates.every((date) => new Date(date) < new Date())
}
