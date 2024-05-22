import './ShowDetails.scss'
import { useState } from 'react'
import { showService } from 'services/ShowService'
import { Show } from 'models/Show'
import { Seat } from 'models/Seat'
import { ShowDate } from 'models/ShowDate'
import { useOnInit } from 'hooks/hooks'
import { useParams } from 'react-router-dom'
import { CardDate } from 'components/Card/CardDate/CardDate'
import { Carousel } from 'components/Carousel/Carousel'
import { Comment } from 'components/Comment/Comment'
import { ShowDetailsBase } from './ShowDetailsBase'
import { ShowDetailsAdmin } from './ShowDetailsAdmin'
import { userSessionStorage } from 'models/helpers/userSessionStorage'
import { enqueueSnackbar } from 'notistack'
import { cartService } from 'services/CartService'
import { TicketBuyProps } from 'models/interfaces/ticketBuy'

export const ShowDetails = () => {
  const { id } = useParams()
  const [show, setShow] = useState<Show>()
  const [seats, setSeats] = useState<Seat[]>([])
  const [dateSelected, setDateSelected] = useState<ShowDate>()
  const isAdmin = userSessionStorage.userIsAdmin()

  // Loads show from backend
  const getShowById = async () => {
    try {
      const fetchedShow = await showService.getShowById(+id!)
      setShow(fetchedShow)
      await getShowSeatTypes(fetchedShow.dates[0])
      setDateSelected(fetchedShow.dates[0])
    } catch (err) {
      enqueueSnackbar(`${err}`, { variant: 'error' })
    }
  }

  const handleDateClick = (showDate: ShowDate) => {
    setDateSelected(showDate)
    getShowSeatTypes(showDate)
  }

  const handlePickerUpdate = (seat: Seat) => {
    setSeats((prevSeats) => {
      return prevSeats.map((s) => (s.id === seat.id ? seat : s))
    })
  }

  const addPendingAttendee = async () => {
    try {
      if (show) {
        await showService.addPendingAttendee(show.id)
        enqueueSnackbar('Se notificará cuando se agregue una nueva función ', { variant: 'success' })
      }
    } catch {
      enqueueSnackbar('No se pudo agregar a la lista de pendientes', { variant: 'warning' })
    }
  }

  const getShowSeatTypes = async (selectedDate: ShowDate) => {
    try {
      const fetchedSeats: Seat[] = await showService.getSeatsByShowDate(selectedDate)
      fetchedSeats.forEach((seat) => {
        seat.disabled = (seat.available <= 0)
      })
      setSeats([...fetchedSeats])
    } catch (err) {
      console.error(err)
    }
  }

  const addToCart = async () => {
    try {
      if (show && dateSelected) {
        if (seats.some((seat) => seat.reservedQuantity > 0)) {
          const tickets = seats.map((seat) => {
            return {
              showDateId: dateSelected.id,
              seatId: seat.id,
              quantity: seat.reservedQuantity,
            } as TicketBuyProps
          })
          cartService.reserve(tickets)
          getShowById()
          enqueueSnackbar('Carrito actualizado con éxito', { variant: 'success' })
        } else {
          // No se seleccionó ningún ticket
          enqueueSnackbar('No se seleccionó ningún ticket', { variant: 'warning' })
        }
      }
    } catch (error) {
      console.error('Error al agregar el espectáculo al carrito:', error)
    }
  }

  const datelist = () => {
    return show
      ? show.dates.map((showDate, index) => (
        <CardDate
          key={showDate.date.toDateString()}
          isDisable={showDate.date < new Date()}
          showDate={showDate}
          isSelected={!dateSelected ? (index === 0 ? true : false) : showDate === dateSelected}
          handleClick={handleDateClick}
        />
      ))
      : []
  }

  // Hook callbacks
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
                <Carousel elements={datelist()} maxElements={4} />
              </div>
              {seats && isAdmin ? (
                <ShowDetailsAdmin show={show} />
              ) : (
                <ShowDetailsBase
                  seats={seats}
                  handlePickerUpdate={handlePickerUpdate}
                  addToCart={addToCart}
                  dateSelected={dateSelected}
                  isSoldOut={show.isSoldOut}
                  addPendingAttendee={addPendingAttendee}
                />
              )}
            </section>
          </section>
          <section className="show-details__comments text">
            {!isAdmin &&
              show.comments.map((comment) => <Comment key={comment.id} className="show-details__comment" comment={comment} />)}
          </section>
        </article>
      )}
    </>
  )
}
