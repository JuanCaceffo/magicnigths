import { differenceInYears } from 'date-fns'
import { UserProps } from 'models/interfaces/UserProps'
import moment from 'moment'

export class User {
  id: number
  profileImgUrl: string
  firstName: string
  lastName: string
  username: string
  birthday: Date
  dni: number

  constructor(props?: UserProps) {
    this.id = props?.id ?? 0
    this.profileImgUrl = props?.profileImgUrl ?? 'default.jpg'
    this.firstName = props?.firstName ?? ''
    this.lastName = props?.lastName ?? ''
    this.username = props?.username ?? ''
    this.birthday = moment(props?.birthday).toDate() ?? new Date()
    this.dni = props?.dni ?? 0
  }

  get age() {
    return differenceInYears(new Date(), this.birthday)
  }
}
