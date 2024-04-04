import { FC } from 'react'
import './Comment.scss'
import { CommentProps } from 'src/data/interfaces/CommentProps'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const Comment: FC<CommentProps> = ({ imgPath, title, date, rating, text }) => {
  return (
    <article className="comment ">
      <header className="comment__header comment--flex">
        <section className="comment__description comment--flex">
          <img className="comment__img" src={imgPath} />
          <div>
            <h2 className="text--md">{title}</h2>
            <span>{format(date, 'MMMM yyyy', { locale: es })}</span>
          </div>
        </section>
        <section className="comment__state comment--flex">
          <div className="comment__rating comment--flex">
            <i className="fa-solid fa-star"></i>
            <span>{rating}</span>
          </div>
          <i className="fa-solid fa-trash"></i>
        </section>
      </header>
      <section>{text}</section>
    </article>
  )
}

export default Comment
