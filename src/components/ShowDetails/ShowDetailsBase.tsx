import { useLocation, useNavigate } from 'react-router-dom'
import { Seat } from 'src/data/model/Seat'
import { SeatBox } from '../SeatBox/SeatBox'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'

interface ShowDetailsBaseArgs {
  seats: Seat[]
  handlePickerUpdate: (seat: Seat) => void
  addToCart: () => void
}

export const ShowDetailsBase = (args: ShowDetailsBaseArgs) => {
  const { seats = [], handlePickerUpdate, addToCart } = args
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <div className="show-details__body-info">
        {seats.map((seat) => (
          <SeatBox key={seat.seatType} isDisable={seat.disabled} seat={seat} handler={handlePickerUpdate} />
        ))}
      </div>
      <div className="show-details__bottom">
        <button
          className="button button--primary button--rounded button--tall button--large animated shadow--box text--strong text--spaced"
          onClick={() => {
            //Si no esta logeado te manda al login y le pasamos la locacion de la esta pagina
            !userSessionStorage.userIsLoged() && navigate('/login', { state: location })
            addToCart
            //si si esta logeado agregamos los shows al back
          }}
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </>
  )
}
