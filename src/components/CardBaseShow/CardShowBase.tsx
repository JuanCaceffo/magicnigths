import { FC } from 'react'
import './CardShowBase.css'
import StarIcon from '@mui/icons-material/Star'
import { Show } from 'src/data/model/Show'

interface CardShowBaseProps {
  data: Show
}

const CardShowBase: FC<CardShowBaseProps> = ({ data }) => {
  const LIMIT_FRIENDS = 3

  const pasedLimitFriends = () => data.userImgs.length > LIMIT_FRIENDS
  const restFriends = () => pasedLimitFriends() && data.userImgs.length - LIMIT_FRIENDS
  return (
    <>
      <main className="card-show">
        <header className="card-show__header">
          <img className="card-show__img" src="/mock-imgs/card-show-imgs/velapuerca.jpg" alt="" />
        </header>
        <section className="card-show__cont card-show--flex">
          <header className="card-show--flex">
            <span className="card-show__fileld">{data.name}</span>
            <article className="card-show__fileld">
              <StarIcon fontSize="small"></StarIcon>
              <b>{data.valoration}</b>
              <span>({data.valorationSize})</span>
            </article>
          </header>
          <div className="card-show--flex">
            <article className="card-show__fileld">
              <b>Ubicacion:</b>
              <span>{data.ubication}</span>
            </article>
            <span className="card-show__fileld">
              fechas{' '}
              {data.dates
                .map((date) => new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'numeric' }).format(date))
                .join(' - ')}
            </span>
          </div>
          <div className="card-show--flex">
            {!!data.userImgs.length && (
              <article className="card-show__friends card-show--flex">
                <span>Tambien van a asistir</span>
                <div className="card-show__user-img-cnt">
                  {data.userImgs.slice(0, LIMIT_FRIENDS).map((path) => (
                    <img className="card-show__user-img" src={path}></img>
                  ))}
                </div>
                {pasedLimitFriends() && <span>+ {restFriends()} amigos</span>}
              </article>
            )}
          </div>
          <footer className="card-show--flex">
            <span className="card-show__fileld"></span>
          </footer>
        </section>
      </main>
    </>
  )
}

export default CardShowBase
