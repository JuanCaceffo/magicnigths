export interface ShowProps {
  id: number
  img: string
  name: string
  location: string
  rating: number
  totalComments: number
  dates: Date[]
  userImgs: string[]
  price?: number
  prices?: number[]
}
