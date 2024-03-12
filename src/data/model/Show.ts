//TODO: when the imgs managment will finished in the backend change here if is necesary
export class Show {
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

  pasedLimitFriends = () => this.userImgs.length > this.LIMIT_FRIENDS

  restFriends = () => this.pasedLimitFriends() && this.userImgs.length - this.LIMIT_FRIENDS

  wasPricePaid = () => !!this.price && !!this.pricePaid
}
