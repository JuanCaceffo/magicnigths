import { Box, Button } from '@mui/material'
import './ShowDetails.scss'
import { useEffect, useState } from 'react'
import { showService } from 'src/services/ShowService'
import { Show } from 'src/data/model/Show'
import { useParams } from 'react-router-dom'
import CardDate from '../CardDate/CardDate'
import { Seat } from 'src/data/model/Seat'

export const ShowDetails = () => {
  const params = useParams()
  const [show, setShow] = useState<Show>()
  const [seats, setSeats] = useState<Seat>()

  useEffect(() => {
    try {
      const fetchShow = async () => {
        showService.getShowById(+params['showId']!!).then((value) => {
          setShow(value)
        })
      }

      const fetchSeats = async () => {
        showService.getShowDatesById(+params['showId']!!).then((value) => {
          setSeats(value)
        })
      }

      fetchShow()
      fetchSeats()
    } catch (err) {
      console.log(err)
    }
  }, [params])

  return (
    <>
      {show && (
        <article className="show-details">
          <section className="show-details__header text shadow shadow--box">
            <div className="show-details__name">
              <span className="text--stronger">{`${show.bandName} - `}</span>
              <span>{show.showName}</span>
            </div>
            <div className="show-details__info text text--md">
              <div className="show-details__info-item">
                <span className="text--stronger">
                  <i className="fas fa-star fa-rp" />
                  {`${show.rating} Puntos - `}
                </span>
                <span>{`${show.totalComments} Opiniones`}</span>
              </div>
              <span className="show-details__info-item text--stronger">
                <i className="fas fa-compass fa-rp" />
                {show.facilityName}
              </span>
              <span className="show-details__info-item">{show.geolocation}</span>
            </div>
          </section>
          <section className="show-details__body">
            <section className="show-details__img">
              <img src={`/src/assets/images/${show.showImg}`} />
            </section>
            <section className="show-details__buybox">
              <div className="show-details__dates shadow shadow--line">
                {show.dates.map((date) => (
                  <CardDate key={date.toDateString()} date={date} />
                ))}
              </div>
              <Box className="show-details__seats">{/* <p>{seats?.date.toString()}</p> */}</Box>
              <Box className="show-details__bottom">
                <Button className="show-details__button">Agregar al Carrito</Button>
              </Box>
            </section>
          </section>
        </article>
      )}
    </>
  )
}
