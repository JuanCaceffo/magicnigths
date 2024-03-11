import { FC } from 'react'
import './CardShowBase.css'
import StarIcon from '@mui/icons-material/Star'

const pathPrefix = '/mock-imgs/user-imgs'

const CardShowBase: FC = () => {
  const userImgPaths = [
    `${pathPrefix}/juan.jpeg`,
    `${pathPrefix}/pablito.jpeg`,
    `${pathPrefix}/denise.jpeg`,
    'dsa',
    'dsa',
  ]
  const LIMIT_FRIENDS = 3

  const pasedLimitFriends = () => userImgPaths.length > LIMIT_FRIENDS
  const restFriends = () => pasedLimitFriends() && userImgPaths.length - LIMIT_FRIENDS
  return (
    <>
      <main className="card-show">
        <header className="card-show__header">
          <img className="card-show__img" src="/mock-imgs/card-show-imgs/velapuerca.jpg" alt="" />
        </header>
        <section className="card-show__cont card-show--flex">
          <header className="card-show--flex">
            <span className="card-show__fileld">la vela puerca</span>
            <article className="card-show__fileld">
              <StarIcon fontSize="small"></StarIcon>
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
              <div className="card-show__user-img-cnt">
                {userImgPaths.slice(0, LIMIT_FRIENDS).map((path) => (
                  <img className="card-show__user-img" src={path}></img>
                ))}
              </div>
              {pasedLimitFriends() && <span>+ {restFriends()} amigos</span>}
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
