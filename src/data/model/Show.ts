//TODO: when the imgs managment will finished in the backend change here if is necesary
export class Show {
  //TODO: warining with this params (see another wey to do this)
  constructor(
    public showImg: string,
    public name: string,
    public valoration: number,
    public valorationSize: number,
    public ubication: string,
    public dates: Date[],
    public userImgs: string[],
    public price?: number,
    public pricePaid?: number[],
  ) {}
  LIMIT_FRIENDS = 3

  getLimitedUserImgs = () => {
    console.log(this)
    return this.userImgs.slice(0, this.LIMIT_FRIENDS)
  }

  pasedLimitFriends = () => this.userImgs.length > this.LIMIT_FRIENDS

  restFriends = () => this.pasedLimitFriends() && this.userImgs.length - this.LIMIT_FRIENDS

  wasPricePaid = () => !!this.price
}
