import { useState } from 'react'
import CardShow from '../CardShow/CardShow'
import { useEffect } from 'react'
import { userService } from 'src/services/UserService'
import { isAxiosError } from 'axios'
import { Show } from 'src/data/model/Show'

import './PurchasedTicketContent.css'
import { PopupComment } from '../PopupComment/PopupComment'

export const PurchasedTicketContent = () => {
  const [shows, setShows] = useState<Show[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false) // Estado para controlar si el popup está abierto
  // const [idShowToComment, setIdShowToComment] = useState(-1)

  useEffect(() => {
    const fetchUserShows = async () => {
      try {
        const userShows = await userService.getPurchasedTickets()
        setShows(userShows)
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

    fetchUserShows()
  }, [])

  const handleAddComment = (show: Show) => {
    // setIdShowToComment(show.id) // TODO: agregar atributo al obj de dominio
    setIsPopupOpen(true) // Abre el popup cuando se hace clic en el botón
    console.log(show)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false) // Cierra el popup
  }

  const handleSaveComment = (comment: string) => {
    // const comment = new Comment() //TODO: Crear objeto de dominio
    // Lógica para guardar el comentario
    // userService.addComment()
    setIsPopupOpen(false) // Cierra el popup después de guardar el comentario
    console.log(comment)
  }

  return (
    <>
      {errorMessage ? (
        <p className="error-message error">{errorMessage}</p>
      ) : (
        <div className="ticket-content main__content main__content--grid">
          {shows.map((show, index) => (
            <div key={index}>
              {show.canBeComment() && (
                <CardShow
                  show={show}
                  button={{
                    content: 'Calificar artista',
                    whenclick: () => handleAddComment(show),
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
