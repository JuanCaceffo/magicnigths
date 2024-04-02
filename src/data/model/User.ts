import { differenceInYears } from 'date-fns'

export class User {
  constructor(
    public name: string,
    public surname: string,
    public username: string,
    public birthday: Date,
    public dni: number,
    public img: string,
  ) {}

  getAge(): number {
    return differenceInYears(new Date(), this.birthday)
  }
}
