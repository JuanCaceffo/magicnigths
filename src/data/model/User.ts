export class User {
  name: string
  surname: string
  birthday: Date
  dni: number
  credit: number

  constructor(name: string, surname: string, birthday: Date, dni: number, credit: number) {
    this.name = name
    this.surname = surname
    this.birthday = birthday
    this.dni = dni
    this.credit = credit
  }
}
