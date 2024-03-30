export class User {
  name: string
  surname: string
  birthday: Date
  dni: number
  img: string
  credit: number

  constructor(name: string, surname: string, birthday: Date, dni: number, img:string, credit: number) {
    this.name = name
    this.surname = surname
    this.birthday = birthday
    this.dni = dni
    this.img = img
    this.credit = credit
  }
}
