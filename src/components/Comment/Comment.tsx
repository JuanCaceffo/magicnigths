import { FC } from 'react'
import './Comment.scss'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Comment } from 'src/data/interfaces/Comment'

interface CommentProps {
  comment: Comment
  handleDelete?: () => void
  className?: string
}

const Comment: FC<CommentProps> = ({ className = "", comment, handleDelete }) => {
  return (
    <article className={`comment ${className}`}>
      <header className="comment__header comment--flex">
        <section className="comment__description comment--flex">
          <img className="comment__img" src={`/mock-imgs/user-imgs/${comment.userImg}`} />
          <div>
            <h2 className="text--md">{comment.name}</h2>
            <span>{format(comment.date, 'MMMM yyyy', { locale: es })}</span>
          </div>
        </section>
        <section className="comment__state comment--flex">
          <div className="comment__rating comment--flex">
            <i className="fa-solid fa-star"></i>
            <span>{comment.rating}</span>
          </div>
          {handleDelete && <i onClick={handleDelete} className="fa-solid fa-trash button-trash" />}
        </section>
      </header>
      <section>{comment.text}</section>
    </article>
  )
}

export default Comment
