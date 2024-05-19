import { Colors, ShowStatsProps } from '../interfaces/ShowProps'

//TODO: when the imgs managment will finished in the backend change here if is necesary
export class ShowStat implements ShowStatsProps {
  id: number
  value: number
  color: Colors

  constructor(private props: ShowStatsProps) {
    this.id = this.props.id ?? ''
    this.value = this.props.value ?? ''
    this.color = this.props.color ?? "red"
  }

  static toJson = (data: ShowStatsProps) => new ShowStat(data)
}