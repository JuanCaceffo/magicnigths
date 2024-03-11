import { FC } from 'react'
import './CardShowBase.css'
import StarIcon from '@mui/icons-material/Star'

const CardShowBase: FC = () => {
  return (
    <>
      <main className="card-show">
        <header className="card-show__header">
          <img className="card-show__img" src="/public/mock-imgs/velapuerca.jpg" alt="" />
        </header>
        <section className="card-show__cont card-show--flex">
          <header className="card-show--flex">
            <span className="card-show__fileld">la vela puerca</span>
            <article className="card-show__fileld">
              <StarIcon fontSize="0.4em"></StarIcon>
              <b>4,5</b>
              <span>(150)</span>
            </article>
          </header>
          <div className="card-show--flex">
            <article className="card-show__fileld">
              <b>Ubicacion:</b>
              <span>ubication name</span>
            </article>
            <span className="card-show__fileld">function dates</span>
          </div>
          <div className="card-show--flex">
            <article className="card-show__friends card-show--flex">
              <span>Tambien van a asistir</span>
              <div>user imgs</div>
              {/* if it have more that 3 users then put*/}
              <span>+ 3 amigos</span>
            </article>
          </div>
          <footer className="card-show--flex">
            <span className="card-show__fileld">desde $$$ a $$$ o precio pagado $$$</span>
          </footer>
        </section>
      </main>
    </>
  )
}

export default CardShowBase
