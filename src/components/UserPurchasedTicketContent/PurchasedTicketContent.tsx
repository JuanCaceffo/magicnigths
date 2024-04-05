import { useState } from 'react'
import CardShow from '../CardShow/CardShow'
import { useEffect } from 'react'
import { userService } from 'src/services/UserService'
import { isAxiosError } from 'axios'
import { Show } from 'src/data/model/Show'

import './PurchasedTicketContent.css'
import { PopupComment } from '../PopupComment/PopupComment'
//TODO: refactorizar componente por una solucion mas mantenible
export const PurchasedTicketContent = () => {
  const [shows, setShows] = useState<Show[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false) // Estado para controlar si el popup está abierto
  const [idShowToComment, setIdShowToComment] = useState(-1)

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
  }, [])

  const handleAddComment = (ticketId: number) => {
    setIdShowToComment(ticketId)
    setIsPopupOpen(true) // Abre el popup cuando se hace clic en el botón
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false) // Cierra el popup
  }

  const handleSaveComment = async (comment: string, rating: number) => {
    userService
      .addComment({ ticketId: idShowToComment, text: comment, rating })
      .then(() => {
        setIsPopupOpen(false)
        fetchUserShows()
      })
      .catch((error: unknown) => {
        console.log(error)
        //TODO: manejar error con componente de errores de back si sale mal
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
              //TODO: ver como hacer para que una vez comentado el show no se pueda volver a comentar
              {show.canBeComment() && (
                <CardShow
                  show={show}
                  button={{
                    content: 'Calificar artista',
                    whenclick: () => handleAddComment(index), //TODO: cuando tengamos el id de los comentarios cambiar
                  }}
                />
              )}
              {!show.canBeComment() && <CardShow show={show} />}
            </div>
          ))}
        </div>
      )}
      {/* Renderiza el popup si está abierto */}
      {isPopupOpen && <PopupComment open={isPopupOpen} onSave={handleSaveComment} onClose={handleClosePopup} />}
    </>
  )
}
