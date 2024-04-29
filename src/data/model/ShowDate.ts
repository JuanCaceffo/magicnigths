import moment from 'moment'

export interface ShowDateProps {
  id: number
  date: Date
}

export class ShowDate {
  id: number
  date: Date

  constructor(private props: ShowDateProps) {
    this.id = this.props.id ?? 0
    this.date = moment(this.props.date).toDate() ?? new Date()
  }
}
