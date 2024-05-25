import { ModalDelete } from 'components/Modal/DeleteModal'
import './Comment.scss'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CommentDTO } from 'models/interfaces/CommentDTO'
import { useState } from 'react'

interface CommentProps {
  comment: CommentDTO
  handleDelete?: () => void
  className?: string
}

export const Comment = (args: CommentProps) => {
  const { className = '', comment, handleDelete } = args
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <article className={`comment shadow--div ${className}`}>
        <header className="comment__header centered">
          <section className="comment__description centered">
            <img className="comment__img" src={`/images/${comment.imgSrc}`} />
            <div>
              <h2 className="text--xl">{comment.name}</h2>
              <span className="text">{format(comment.date, 'MMMM yyyy', { locale: es })}</span>
            </div>
          </section>
          <section className="comment__state text--md centered">
            <div className="comment__rating centered">
              <i className="fa-solid fa-star fa--up" />
              <span>{comment.rating}</span>
            </div>
            {handleDelete && (
              <i onClick={() => setIsModalOpen(true)} className="fa-solid fa-trash fa--hot button-trash" />
            )}
          </section>
        </header>
        <section className="comment__text text">{comment.text}</section>
      </article>
      {handleDelete && (
        <ModalDelete
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onSubmit={() => handleDelete()}
          elementName={comment.name}
        />
      )}
    </>
  )
}
