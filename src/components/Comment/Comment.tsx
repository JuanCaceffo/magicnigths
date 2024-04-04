import { FC } from 'react'
import './Comment.scss'

const Comment: FC = () => {
  return (
    <article className="comment ">
      <header className="comment__header comment--flex">
        <section className="comment__description comment--flex">
          <img className="comment__img" src="/mock-imgs/user-imgs/juan.jpeg" />
          <div>
            <h2 className="text--md">title</h2>
            <span>date</span>
          </div>
        </section>
        <section className="comment__state comment--flex">
          <div className="comment__rating comment--flex">
            <i className="fa-solid fa-star"></i>
            <span>rating</span>
          </div>
          <i className="fa-solid fa-trash"></i>
        </section>
      </header>
      <section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Tristique senectus et
        netus et. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Dolor magna eget est lorem ipsum
        dolor sit amet. Orci porta non pulvinar neque laoreet suspendisse
      </section>
    </article>
  )
}

export default Comment
