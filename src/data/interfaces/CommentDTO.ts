export interface CommentDTO {
  imgPath: string
  title: string
  text: string
  rating: number
  date: Date
}

export interface CommentCreateDTO {
  ticketId: number
  text: string
  rating: number
}
