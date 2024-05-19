import { differenceInYears } from 'date-fns'

export class User {
  constructor(
    public profileImg: string,
    public name: string,
    public surname: string,
    public username: string,
    public birthday: Date,
    public dni: number,
  ) {}

  getAge(): number {
    return differenceInYears(new Date(), this.birthday)
  }
}
