import './PurchasedTicketContent.css'
import { CardShow } from 'components/Card/CardShow/CardShow'
import { PopupComment } from 'components/PopupComment/PopupComment'
import { userService } from 'services/UserService'
import { snackbarProfileOptions } from 'pages/Profile/Profile'
import { Show } from 'models/Show'
import { errorHandler } from 'models/helpers/ErrorHandler'
import { CommentCreateDTO } from 'models/interfaces/CommentDTO'
import { userSessionStorage } from 'models/helpers/userSessionStorage'
import { AxiosError, isAxiosError } from 'axios'
import { closeSnackbar, enqueueSnackbar } from 'notistack'
import { useState, useEffect } from 'react'

//TODO: refactorizar componente por una solucion mas mantenible
export const PurchasedTicketContent = () => {
  const [shows, setShows] = useState<Array<Show>>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false) // Estado para controlar si el popup está abierto
  const [commentCreate, setCommentCreat] = useState<CommentCreateDTO>({} as CommentCreateDTO)

  //TODO: cuando el componente de manejo de errores del back este listo aplicarlo aca
  const fetchUserShows = async () => {
    try {
      const userShows = await userService.getBoughtTickets()
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

  const handleAddComment = (userId: number, ticketId: number) => {
    setCommentCreat({ userId, ticketId, })
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
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
                      content: 'Comentar',
                      onClick: () => {
                        handleAddComment(userSessionStorage.getUserId(), show.id)
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
