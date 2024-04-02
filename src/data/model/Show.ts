import moment from 'moment'
import { ShowProps } from '../interfaces/ShowProps'

//TODO: when the imgs managment will finished in the backend change here if is necesary
export class Show {
  constructor(public props: ShowProps) {
    this.dates = props.dates.map((date) => moment.utc(date).toDate())
  }
  dates!: Date[]
  LIMIT_FRIENDS = 3

  getMinMaxPrices = () => (this.props.prices ? [Math.min(...this.props.prices), Math.max(...this.props.prices)] : [])

  getLimitedUserImgs = () =>
    this.pasedLimitFriends()
      ? this.props.userImageNames!!.slice(0, this.LIMIT_FRIENDS)
      : this.props.userImageNames!!.slice(0, this.props.userImageNames!!.length)

  pasedLimitFriends = () => this.props.userImageNames!!.length > this.LIMIT_FRIENDS

  restFriends = () => this.pasedLimitFriends() && this.props.userImageNames!!.length - this.LIMIT_FRIENDS

  wasPricePaid = () => !!this.props.price

  // Devuelve si el show puede ser comentado o no
  canBeComment = () => this.props.dates.every((date) => new Date(date) < new Date())
}
