
import { UUID } from 'crypto'
import { Colors, ShowStatsProps } from 'models/interfaces/ShowProps'

export class ShowStat implements ShowStatsProps {
  id: UUID
  value: number
  color: Colors

  constructor(private props: ShowStatsProps) {
    this.id = this.props.id ?? null
    this.value = this.props.value ?? ''
    this.color = this.props.color ?? "red"
  }

  static toJson = (data: ShowStatsProps) => new ShowStat(data)
}