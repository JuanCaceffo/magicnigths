import { useLocation, useNavigate } from 'react-router-dom'
import { Seat } from 'models/Seat'
import { SeatBox } from '../SeatBox/SeatBox'
import { userSessionStorage } from 'models/helpers/userSessionStorage'
import { ShowDate } from '/models/ShowDate'
import { enqueueSnackbar } from 'notistack'

interface ShowDetailsBaseArgs {
  seats: Seat[]
  handlePickerUpdate: (seat: Seat) => void
  addToCart: () => void
  dateSelected?: ShowDate
  isSoldOut: boolean
}

export const ShowDetailsBase = (args: ShowDetailsBaseArgs) => {
  const { seats = [], handlePickerUpdate, addToCart } = args
  const navigate = useNavigate()
  const location = useLocation()

  const canAddToCart = () => {
    // La fecha seleccionada no pasó
    return args.dateSelected && args.dateSelected.date >= new Date()
  }

  const notifyNewShowDate = () => {
    enqueueSnackbar('Se notificará cuando se agregue una nueva función ', { variant: 'success' })
  }

  return (
    <>
      <div className="show-details__body-info">
        {seats.map((seat) => (
          <SeatBox key={seat.id} isDisable={seat.disabled} seat={seat} handler={handlePickerUpdate} />
        ))}
      </div>
      <div className="show-details__bottom">
        {!args.isSoldOut && (
          <button
            className={`button button--primary button--rounded button--tall button--large animated shadow--box text--strong text--spaced ${!canAddToCart() ? 'button--disabled' : ''}`}
            disabled={!canAddToCart()}
            onClick={() => {
              //Si no esta logeado te manda al login y le pasamos la locacion de la esta pagina
              !userSessionStorage.userIsLoged() && navigate('/login', { state: location })
              addToCart()
              //si si esta logeado agregamos los shows al back
            }}
          >
            AGREGAR AL CARRITO
          </button>
        )}
        {args.isSoldOut && (
          <button
            className="button button--primary button--rounded button--tall button--large animated shadow--box text--strong text--spaced>"
            onClick={() => {
              //Si no esta logeado te manda al login y le pasamos la locacion de la esta pagina
              !userSessionStorage.userIsLoged() && navigate('/login', { state: location })
              notifyNewShowDate()
              //si si esta logeado agregamos los shows al back
            }}
          >
            NOTIFICAR NUEVA FUNCIÓN
          </button>
        )}
      </div>
    </>
  )
}
