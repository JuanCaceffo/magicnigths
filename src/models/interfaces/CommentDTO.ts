export interface CommentDTO {
  id: number
  userId: number
  showId: number
  imgSrc: string
  name: string
  text: string
  rating: number
  date: Date
}

export interface CommentCreateDTO {
  userId: number
  ticketId: number
  text?: string
  rating?: number
}
