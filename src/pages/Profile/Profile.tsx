import './Profile.scss'
import { Divider } from '@mui/material'
import { PurchasedTicketContent } from 'components/UserPurchasedTicketContent/PurchasedTicketContent'
import { useEffect, useState } from 'react'
import { User } from 'models/User'
import { userService } from 'services/UserService'
import { AxiosError, isAxiosError } from 'axios'
import { UserData } from 'components/UserData/UserData'
import { SelectionContent, UserSelectionPanel } from 'components/UserSelectionPanel/UserSelectionPanel'
import { FriendsContent } from 'components/UserFriendsContent/FriendsContent'
import { CommentsContent } from 'components/UserCommentsContent/CommentsContent'
import { OptionsObject, closeSnackbar, enqueueSnackbar } from 'notistack'
import { errorHandler } from 'models/helpers/ErrorHandler'
import { ModalCredit, creditValue } from 'components/Modal/ModalCredit'
import { UserUpdateProps } from 'models/interfaces/UserProps'

export const snackbarProfileOptions: OptionsObject = {
  anchorOrigin: { horizontal: 'left', vertical: 'top' },
}

export const Profile = () => {
  const [user, setUser] = useState<User>(new User())
  const [credit, setCredit] = useState(0)
  const [content, setContent] = useState(SelectionContent.PURCHASED_TICKET)
  const [errorMessage, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchUserData()
    return () => {
      closeSnackbar()
    }
  }, [])

  const fetchUserData = async () => {
    try {
      const userData = await userService.getUser()
      setUser(userData)
      try {
        const userCredit = await userService.getCredit()
        setCredit(userCredit)
      } catch (e) {
        handleRequestError(e)
      }
    } catch (e) {
      handleRequestError(e)
    }
  }

  const handleRequestError = (e: unknown) => {
    console.error(e)
    if (isAxiosError(e)) {
      if (e.message) {
        setError(e.message)
      } else {
        setError(e.response?.data.message)
      }
    } else {
      setError(e as string)
    }
  }

  const handleUpdateUser = async (data: UserUpdateProps) => {
    const updatedUser = new User({
      ...user,
      firstName: data.firstName,
      lastName: data.lastName,
    })

    try {
      await userService.updateUser(updatedUser)
      setUser(updatedUser)
      enqueueSnackbar('Datos guardados con éxito', { variant: 'success', ...snackbarProfileOptions })
      fetchUserData()
    } catch (error) {
      enqueueSnackbar(errorHandler(error as AxiosError), snackbarProfileOptions)
    }
  }

  const handleAddCredit = async (data: creditValue) => {
    try {
      const updatedCredit = await userService.addCreditToUser(data.credit)
      setIsModalOpen(false)
      setCredit(updatedCredit)
      enqueueSnackbar('Creditos agregados con exito', { variant: 'success', ...snackbarProfileOptions })
    } catch (error) {
      enqueueSnackbar(errorHandler(error as AxiosError), snackbarProfileOptions)
    }
  }

  const handleOpenModel = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {errorMessage ? (
        <p className="error-message error">{errorMessage}</p>
      ) : (
        <main className="main__content main__content--profile">
          <article className="profile centered">
            <section className="profile profile--sidebar">
              <UserData user={user} onSubmit={handleUpdateUser} />
              <h3 className="credit text--md" data-testid="credit">
                <span>Crédito Actual:</span>
                <span>${credit}</span>
              </h3>
              <button
                className="button button--primary button--tall button--rounded animated text--spaced text--strong shadow--box"
                onClick={handleOpenModel}
              >
                SUMAR CREDITO
              </button>
            </section>
            <section className="profile profile--content">
              <UserSelectionPanel content={content} onChange={(newValue: SelectionContent) => setContent(newValue)} />
              <Divider />
              <div className="profile__content">
                {content === SelectionContent.PURCHASED_TICKET && <PurchasedTicketContent />}
                {content === SelectionContent.FRIENDS && <FriendsContent />}
                {content === SelectionContent.COMMENTS && <CommentsContent />}
              </div>
              {isModalOpen && (
                <ModalCredit
                  isOpen={isModalOpen}
                  handleClose={() => setIsModalOpen(false)}
                  onSubmit={handleAddCredit}
                  errorMessage={null}
                />
              )}
            </section>
          </article>
        </main>
      )}
    </>
  )
}
