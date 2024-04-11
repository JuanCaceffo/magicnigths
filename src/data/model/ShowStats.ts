import { ShowStatsProps } from '../interfaces/ShowProps'

//TODO: when the imgs managment will finished in the backend change here if is necesary
export class ShowStats implements ShowStatsProps {
  id: number
  totalSales: number
  pendingAttendees: number
  rentability: number
  soldOutDates: number
  baseCost: number

  constructor(private props: ShowStatsProps) {
    this.id = this.props.id ?? ''
    this.totalSales = this.props.totalSales ?? ''
    this.pendingAttendees = this.props.pendingAttendees ?? ''
    this.rentability = this.props.rentability ?? ''
    this.soldOutDates = this.props.soldOutDates ?? ''
    this.baseCost = this.props.baseCost ?? ''
  }
}