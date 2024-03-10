import { FC } from 'react'
import './CardShowBase.css'

const CardShowBase: FC = () => {
  return (
    <>
      <main className="card-show">
        <header className="card-show__header">
          <img src="" alt="" />
        </header>
        <section className="card-show__cont">
          <header className="card-show__cont--flex">
            <h6>band name</h6>
            <div>
              <i>star icon</i>
              <b>valoration 0 - 5</b>
              <span>valoration size</span>
            </div>
          </header>
          <article className="card-show__cont">
            <div>
              <b>Ubicacion:</b>
              <span>ubication name</span>
            </div>
            <span>function dates</span>
            <div>
              <span>Tambien van a asistir</span>
              <div>user imgs</div>
              {/* if it have more that 3 users then put*/}
              <span>+ 3 amigos</span>
            </div>
          </article>
          <footer className="card-show__cont--flex"></footer>
        </section>
      </main>
    </>
  )
}

export default CardShowBase
