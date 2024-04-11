import './Comment.scss'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CommentDTO } from 'src/data/interfaces/CommentDTO'

interface CommentProps {
  comment: CommentDTO
  handleDelete?: () => void
  className?: string
}

export const Comment = (args: CommentProps) => {
  const { className = '', comment, handleDelete } = args
  return (
    <article className={`comment ${className}`}>
      <header className="comment__header centered">
        <section className="comment__description centered">
          <div className="comment__img-container">
            <img className="comment__img" src={`/images/${comment.imgPath}`} />
          </div>
          <div>
            <h2 className="text--md">{comment.title}</h2>
            <span>{format(comment.date, 'MMMM yyyy', { locale: es })}</span>
          </div>
        </section>
        <section className="comment__state centered">
          <div className="comment__rating centered">
            <i className="fa-solid fa-star fa--up text--strong" />
            <span>{comment.rating}</span>
          </div>
          {handleDelete && <i onClick={handleDelete} className="fa-solid fa-trash fa--hot button-trash" />}
        </section>
      </header>
      <section>{comment.text}</section>
    </article>
  )
}
