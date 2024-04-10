export interface CDateArgs {
  date: string
  time: string
}

export class CDate implements CDateArgs {
  date: string
  time: string

  constructor(data: CDateArgs = { date: '00/00/0000', time: '00:00:00' }) {
    this.validateDate(data.date)
    this.validateTime(data.time)
    this.date = data.date
    this.time = data.time
  }

  private validateDate(date: string) {
    if (!/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])[\/-](0[1-9]|1[0-2])[\/-]\d{4}$/.test(date)) {
      throw new Error('Invalid date format try dd/MM/yyyy')
    }
  }

  private validateTime(time: string) {
    if (!/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(time)) {
      throw new Error('Invalid time format try 24 hours time format like 22:00:00')
    }
  }

  static validateFutureDate = (date: string) => {
    const selectedDate = new Date(date)
    return selectedDate >= new Date()
  }

  get toDate(): Date {
    const [day, month, year] = this.date.includes('-')
      ? this.date.split('-')
      : this.date.includes('/')
        ? this.date.split('/')
        : []
    const [hour, minute, second] = this.time.split(':')

    return new Date(+year, +month - 1, +day, +hour, +minute, +second)
  }

  get isoDate() {
    return this.toDate.toISOString()
  }

  static fromJSON(data: CDateArgs): CDate {
    return new CDate(data)
  }
}
