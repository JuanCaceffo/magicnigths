import { differenceInYears } from "date-fns"

export class User {
  name: string
  surname: string
  birthday: Date
  dni: number
  img: string

  constructor(name: string, surname: string, birthday: Date, dni: number, img:string) {
    this.name = name
    this.surname = surname
    this.birthday = birthday
    this.dni = dni
    this.img = img
  }

  getAge(): number {
    return differenceInYears(new Date(), this.birthday)
  }
}
