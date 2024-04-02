import { ShowProps } from '../interfaces/ShowProps'

//TODO: when the imgs managment will finished in the backend change here if is necesary
export class Show {
  constructor(public props: ShowProps) {}
  LIMIT_FRIENDS = 3

  getLimitedUserImgs = () =>
    this.pasedLimitFriends()
      ? this.props.userImgs.slice(0, this.LIMIT_FRIENDS)
      : this.props.userImgs.slice(0, this.props.userImgs.length)

  pasedLimitFriends = () => this.props.userImgs.length > this.LIMIT_FRIENDS

  restFriends = () => this.pasedLimitFriends() && this.props.userImgs.length - this.LIMIT_FRIENDS

  wasPricePaid = () => !!this.props.price

  // Devuelve si el show puede ser comentado o no
  canBeComment = () => this.props.dates.every((date: Date) => date < new Date())
}
