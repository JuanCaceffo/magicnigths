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
  geolocation?: string
  quantity: number

  constructor(private props: ShowProps) {
    this.id = props.id ?? -1
    this.showImg = props.showImg ?? 'default.jpg'
    this.showName = props.showName ?? ''
    this.bandName = props.bandName ?? ''
    this.facilityName = props.facilityName ?? ''
    this.rating = props.rating ?? 0
    this.totalComments = props.totalComments ?? 0
    this.price = props.price ?? 0
    this.prices = props.prices ?? []
    this.userImageNames = props.userImageNames ?? []
    this.comments = props.comments ?? []
    this.dates = props.dates.map((date) => moment.utc(date).toDate()) ?? []
    this.geolocation = props.geolocation ?? ''
    this.quantity = props.quantity ?? 0
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

  // Devuelve si el show puede ser comentado o no
  canBeComment = () => this.dates.every((date) => new Date(date) < new Date())
}
