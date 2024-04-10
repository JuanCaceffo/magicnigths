export interface CDateArgs {
  date: string
  time: string
}

export class CDate implements CDateArgs {
  date: string
  time: string

  constructor(data: CDateArgs = { date: '00/00/0000', time: '00:00:00' }) {
    CDate.validateDate(data.date)
    CDate.validateTime(data.time)
    this.date = data.date
    this.time = data.time
  }

  static validateDate(date: string) {
    if (!/^\d{4}[\/-](0[1-9]|1[0-2])[\/-](0[1-9]|1[0-9]|2[0-9]|3[0-1])$/.test(date)) {
      throw new Error('Invalid date format try yyyy/mm/dd')
    }
  }

  static validateTime(time: string) {
    if (!/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(time) && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      throw new Error('Invalid time format try 24 hours time format like 22:00:00')
    }
  }

  static validateFutureDate = (date: string) => CDate.onlyDate(date) >= CDate.onlyDate()

  static onlyDate = (date?: string) => {
    const [day, month, year] = date
      ? date
          .split('-')
          .reverse()
          .map((n) => +n)
      : new Date()
          .toLocaleDateString()
          .split('/')
          .map((n) => +n)

    return new Date(year, month - 1, day, 0, 0, 0, 0)
  }

  static validateFutureTime = (time: string) => {
    const currentDate = new Date()
    const currentTime = [currentDate.getHours(), currentDate.getMinutes()]
    const evaluatedTime = time.split(':').map(Number)

    return currentTime[0] < evaluatedTime[0]
      ? true
      : currentTime[0] != evaluatedTime[0]
        ? false
        : currentTime[1] <= evaluatedTime[1]
          ? true
          : false
  }

  get toDate(): Date {
    const [year, month, day] = this.date.includes('-')
      ? this.date.split('-')
      : this.date.includes('/')
        ? this.date.split('/')
        : []
    const [hour, minute, second] = this.time.split(':')

    return new Date(+year, +month - 1, +day, +hour - 3, +minute, second ? +second : 0)
  }

  get isoDate() {
    return this.toDate.toISOString()
  }

  static fromJSON(data: CDateArgs): CDate {
    return new CDate(data)
  }

  private static toTwoDigits = (number: number) => (number < 10 ? `0${number}` : number)

  static currentDDMMYYYY = () => {
    const date = new Date()
    const [day, month, year] = [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()]
    return `${this.toTwoDigits(day)}/${this.toTwoDigits(month)}/${year}`
  }

  static currenHour = () => {
    const date = new Date()
    const [hour, min, sec] = [date.getHours(), date.getMinutes(), date.getSeconds()]
    return `${this.toTwoDigits(hour)}:${this.toTwoDigits(min)}::${this.toTwoDigits(sec)}`
  }

  static isSameDate = (date: string) => {
    CDate.validateDate(date)
    return CDate.onlyDate(date).getTime() == CDate.onlyDate().getTime()
  }
}
