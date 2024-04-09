import './ShowDetails.scss'
import { Box } from '@mui/material'
import { useState } from 'react'
import { showService } from 'src/services/ShowService'
import { Show } from 'src/data/model/Show'
import { useParams } from 'react-router-dom'
import CardDate from '../Card/CardDate/CardDate'
import { Seat } from 'src/data/model/Seat'
import { SeatBox } from '../SeatBox/SeatBox'
import { useOnInit } from 'src/hooks/hooks'
import Comment from '../Comment/Comment'

export const ShowDetails = () => {
  const { id } = useParams()
  const [show, setShow] = useState<Show>()
  const [seats, setSeats] = useState<Seat[]>([])
  const [dateSelected, setDateSelected] = useState<Date>()

  const handleDateClick = (date: Date) => {
    setDateSelected(date)
    getShowSeatTypes(date)
  }

  const handlePickerUpdate = (seat: Seat) => {
    setSeats((prevSeats) => {
      return [...prevSeats.slice(0, seat.id), seat, ...prevSeats.slice(seat.id + 1)]
    })
  }

  const getShowById = async () => {
    try {
      const fetchedShow = await showService.getShowById(+id!)
      setShow(fetchedShow)
      await getShowSeatTypes(fetchedShow.dates[0])
    } catch (err) {
      console.log(err)
    }
  }

  const getShowSeatTypes = async (selectedDate: Date) => {
    try {
      const fetchedSeats: Seat[] = await showService.getSeatsByShowDate(+id!, selectedDate!)
      setSeats([...fetchedSeats])
    } catch (err) {
      console.log(err)
    }
  }

  useOnInit(async () => {
    await getShowById()
  })

  return (
    <>
      {show && (
        <article className="show-details">
          <header className="show-details__header text shadow shadow--div">
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
          </header>
          <section className="show-details__body">
            {/* <section className="show-details__img"> */}
            <img className="show-details__img" src={`/images/${show.showImg}`} />
            {/* </section> */}
            <section className="show-details__buybox">
              <div className="show-details__dates shadow shadow--line">
                {show.dates.map((date, index) => (
                  <CardDate
                    key={date.toDateString()}
                    isSelected={!dateSelected ? (index === 0 ? true : false) : date === dateSelected}
                    isDisable={date < new Date()}
                    date={date}
                    handleClick={handleDateClick}
                  />
                ))}
              </div>
              <Box className="show-details__seats">
                {seats.map((seat) => (
                  <SeatBox key={seat.seatType} isDisable={seat.disabled} seat={seat} handler={handlePickerUpdate} />
                ))}
              </Box>
              <Box className="show-details__bottom">
                <button className="button button--primary button--rounded button--tall button--large animated shadow--box text--strong text--spaced">
                  AGREGAR AL CARRITO
                </button>
              </Box>
            </section>
          </section>
          <section className="show-details__comments text">
            {show.comments.map((comment) => (
              <Comment className="show-details__comment" comment={comment} />
            ))}
          </section>
        </article>
      )}
    </>
  )
}
