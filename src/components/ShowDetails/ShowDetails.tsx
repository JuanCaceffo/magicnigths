import './ShowDetails.scss'
import { useState } from 'react'
import { showService } from 'src/services/ShowService'
import { Show } from 'src/data/model/Show'
import { useNavigate, useParams } from 'react-router-dom'
import { CardDate } from '../Card/CardDate/CardDate'
import { Seat } from 'src/data/model/Seat'
import { useOnInit } from 'src/hooks/hooks'
import { Comment } from '../Comment/Comment'
import { ShowDetailsBase } from './ShowDetailsBase'
import { useAuth } from 'src/context/AuthProvider'
import { ShowDetailsAdmin } from './ShowDetailsAdmin'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'
import { Ticket } from 'src/data/model/Ticket'
import { enqueueSnackbar } from 'notistack'
import { cartService } from 'src/services/CartService'
import { ShowDate } from 'src/data/model/ShowDate'

export const ShowDetails = () => {
  const { id } = useParams()
  const [show, setShow] = useState<Show>()
  const [seats, setSeats] = useState<Seat[]>([])
  const [dateSelected, setDateSelected] = useState<ShowDate>()
  const { isAdmin, checkAdminStatus } = useAuth()
  const navigate = useNavigate()

  const handleDateClick = (showDate: ShowDate) => {
    setDateSelected(showDate)
    getShowSeatTypes(showDate)
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
      console.error(err)
    }
  }

  const getShowSeatTypes = async (selectedDate: ShowDate) => {
    try {
      const fetchedSeats: Seat[] = await showService.getSeatsByShowDate(+id!, selectedDate!)
      setSeats([...fetchedSeats])
    } catch (err) {
      console.error(err)
    }
  }

  const addToCart = async () => {
    try {
      if (userSessionStorage.userIsLoged()) {
        if (show && dateSelected) {
          seats.forEach(async (seat) => {
            const ticketData = Ticket.toJson({
              showId: show.id,
              date: dateSelected.date,
              seatPrice: seat.price,
              seatTypeName: seat.seatType,
              quantity: seat.reservedQuantity,
            })
            await cartService.addReservedTicket(ticketData)
          })
          enqueueSnackbar('Carrito actualizado con éxito', { variant: 'success' })
        }
      } else {
        navigate('/login', { state: location })
      }
    } catch (error) {
      console.error('Error al agregar el espectáculo al carrito:', error)
    }
  }

  useOnInit(async () => {
    checkAdminStatus()
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
                  <i className="fas fa-star fa--rp fa--up" />
                  {`${show.rating} Puntos - `}
                </span>
                <span>{`${show.totalComments} Opiniones`}</span>
              </div>
              <span className="show-details__info-item text--stronger">
                <i className="fas fa-compass fa--rp" />
                <span>{show.facilityName}</span>
              </span>
              <span className="show-details__info-item">{show.geolocation}</span>
            </div>
          </header>
          <section className="show-details__body">
            <img className="show-details__img" src={`/images/${show.showImg}`} />
            <section className="show-details__buybox">
              <div className="show-details__dates shadow shadow--line">
                {show.dates.map((showDate, index) => (
                  <CardDate
                    key={showDate.date.toDateString()}
                    isSelected={!dateSelected ? (index === 0 ? true : false) : showDate === dateSelected}
                    isDisable={showDate.date < new Date()}
                    showDate={showDate}
                    handleClick={handleDateClick}
                  />
                ))}
              </div>
              {seats && isAdmin ? (
                <ShowDetailsAdmin show={show} />
              ) : (
                <ShowDetailsBase seats={seats} handlePickerUpdate={handlePickerUpdate} addToCart={addToCart} />
              )}
            </section>
          </section>
          <section className="show-details__comments text">
            {!isAdmin &&
              show.comments.map((comment) => <Comment className="show-details__comment" comment={comment} />)}
          </section>
        </article>
      )}
    </>
  )
}
