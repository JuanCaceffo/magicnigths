import { useState } from 'react'
import CardShow from '../Card/CardShow/CardShow'
import { useEffect } from 'react'
import { userService } from 'src/services/UserService'
import { AxiosError, isAxiosError } from 'axios'
import { Show } from 'src/data/model/Show'

import './PurchasedTicketContent.css'
import { PopupComment } from '../PopupComment/PopupComment'
import { closeSnackbar, enqueueSnackbar } from 'notistack'
import { snackbarProfileOptions } from 'src/pages/Profile/Profile'
import { errorHandler } from 'src/data/helpers/ErrorHandler'
//TODO: refactorizar componente por una solucion mas mantenible
export const PurchasedTicketContent = () => {
  const [shows, setShows] = useState<Show[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false) // Estado para controlar si el popup está abierto
  const [gorupTicketId, setGorupTicketId] = useState(-1)

  //TODO: cuando el componente de manejo de errores del back este listo aplicarlo aca
  const fetchUserShows = async () => {
    try {
      const userShows = await userService.getPurchasedTickets()
      setShows([...userShows])
    } catch (e) {
      console.log(e)
      if (isAxiosError(e)) {
        if (e.message) {
          setErrorMessage(e.message)
        } else {
          setErrorMessage(e.response?.data.message)
        }
      } else {
        setErrorMessage(e as string)
      }
    }
  }
  useEffect(() => {
    fetchUserShows()
    return () => {
      closeSnackbar()
    }
  }, [])

  const handleAddComment = (ticketId: number) => {
    setGorupTicketId(ticketId)
    setIsPopupOpen(true) // Abre el popup cuando se hace clic en el botón
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false) // Cierra el popup
  }

  const handleSaveComment = async (comment: string, rating: number) => {
    userService
      .addComment({ groupTicketId: gorupTicketId, text: comment, rating })
      .then(() => {
        setIsPopupOpen(false)
        fetchUserShows()
        enqueueSnackbar('Comentario realizado con exito', { variant: 'success', ...snackbarProfileOptions })
      })
      .catch((error: AxiosError) => {
        enqueueSnackbar(errorHandler(error), snackbarProfileOptions)
      })
  }

  return (
    <>
      {errorMessage ? (
        <p className="error-message error">{errorMessage}</p>
      ) : (
        <div className="ticket-content main__content main__content--grid">
          {shows.map((show, index) => (
            <div key={index}>
              <CardShow
                show={show}
                quantity={show.quantity}
                button={
                  show.canBeCommented
                    ? {
                        content: 'Calificar artista',
                        onClick: handleAddComment, //TODO: cuando tengamos el id de los tickets y groupTickets cambiar
                      }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      )}
      {/* Renderiza el popup si está abierto */}
      {isPopupOpen && <PopupComment open={isPopupOpen} onSave={handleSaveComment} onClose={handleClosePopup} />}
    </>
  )
}
