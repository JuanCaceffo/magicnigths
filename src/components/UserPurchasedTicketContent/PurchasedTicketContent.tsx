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
import { CommentCreateDTO } from 'src/data/interfaces/CommentDTO'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'
//TODO: refactorizar componente por una solucion mas mantenible
export const PurchasedTicketContent = () => {
  const [shows, setShows] = useState<Array<Show>>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false) // Estado para controlar si el popup está abierto
  const [commentCreate, setCommentCreat] = useState<CommentCreateDTO>({} as CommentCreateDTO)

  //TODO: cuando el componente de manejo de errores del back este listo aplicarlo aca
  const fetchUserShows = async () => {
    try {
      const userShows = await userService.getPurchasedTickets()
      setShows([...userShows])
    } catch (e) {
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

  const handleAddComment = (userId: number, showId: number, showDateId: number) => {
    setCommentCreat({ userId, showId, showDateId })
    setIsPopupOpen(true) // Abre el popup cuando se hace clic en el botón
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false) // Cierra el popup
  }

  const handleSaveComment = async (comment: string, rating: number) => {
    userService
      .addComment({ ...commentCreate, text: comment, rating })
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
                button={
                  show.canBeCommented
                    ? {
                        content: 'Calificar artista',
                        onClick: () => {
                          handleAddComment(userSessionStorage.getUserId(), show.id, show.date!.id)
                        },
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
