import { CommentArgs } from '../interfaces/Comments'

export class Comment implements CommentArgs {
  userImg: string
  userName: string
  text: string
  rating: number | undefined
  date: Date | undefined

  constructor(public args: CommentArgs) {
    this.userImg = args.userImg ?? ''
    this.userName = args.userName ?? ''
    this.text = args.text ?? ''
    this.rating = args.rating ?? undefined
    this.date = args.date ?? undefined
  }

  static fromJson = (args: CommentArgs) => new Comment(args)
}
