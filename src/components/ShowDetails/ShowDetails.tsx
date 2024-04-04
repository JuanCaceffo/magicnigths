import { Box, Button } from '@mui/material'
import './ShowDetails.scss'
import { useEffect, useState } from 'react'
import { showService } from 'src/services/ShowService'
import { Show } from 'src/data/model/Show'
import { useParams } from 'react-router-dom'
import CardDate from '../CardDate/CardDate'
import { Seat } from 'src/data/model/Seat'
import { SeatBox } from '../SeatBox/SeatBox'

export const ShowDetails = () => {
  const params = useParams()
  const [show, setShow] = useState<Show>()
  const [seats, setSeats] = useState<Seat[]>([])
  const [dateSelected, setDateSelected] = useState<Date>()
  const [picker, setPicker] = useState(0)

  const handleDateClick = (date: Date) => {
    setDateSelected(date)
  }

  useEffect(() => {
    try {
      const fetchShowAndSeats = async () => {
        const fetchedShow = await showService.getShowById(+params['showId']!!)
        setShow(fetchedShow)

        let selectedDate = dateSelected ?? (fetchedShow?.dates.length > 0 ? fetchedShow.dates[0] : null)

        const fetchedSeats: Seat[] = await showService.getSeatsByShowDate(+params['showId']!!, selectedDate!!)
        setSeats(fetchedSeats)
      }

      fetchShowAndSeats()
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
              <img src={`/images/${show.showImg}`} />
            </section>
            <section className="show-details__buybox">
              <div className="show-details__dates shadow shadow--line">
                {show.dates.map((date) => (
                  <CardDate
                    key={date.toDateString()}
                    isSelected={date === dateSelected}
                    isDisable={date < new Date()}
                    date={date}
                    handleClick={handleDateClick}
                  />
                ))}
              </div>
              <Box className="show-details__seats">
                {seats.map((seat) => (
                  <SeatBox key={seat.seatType} seatArgs={seat} value={picker} handler={setPicker} />
                ))}
              </Box>
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
