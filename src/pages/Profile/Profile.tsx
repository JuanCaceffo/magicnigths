import './Profile.css'
import { Divider } from '@mui/material'
import { PurchasedTicketContent } from 'components/UserPurchasedTicketContent/PurchasedTicketContent'
import { useEffect, useState } from 'react'
import { User } from 'models/User'
import { userService } from 'services/UserService'
import { AxiosError, isAxiosError } from 'axios'
import { UserData } from 'components/UserData/UserData'
import { SelectionContent, UserSelectionPanel } from 'components/UserSelectionPanel/UserSelectionPanel'
import { FriendsContent } from 'components/UserFriendsContent/FriendsContent'
import { CommentsContent } from 'components/UserTicketsContent/CommentsContent'
import { OptionsObject, closeSnackbar, enqueueSnackbar } from 'notistack'
import { errorHandler } from 'models/helpers/ErrorHandler'
import { ModalCredit, creditValue } from 'components/Modal/ModalCredit'

export const snackbarProfileOptions: OptionsObject = {
  anchorOrigin: { horizontal: 'left', vertical: 'top' },
}

export const Profile = () => {
  const [user, setUser] = useState(new User('', '', '', '', new Date(), 0))
  const [credit, setCredit] = useState(0)
  const [age, setAge] = useState(0)
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
      setAge(userData.getAge())
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUser((prevUser: User) => {
      const prevUserData: {
        profileImg: string
        name: string
        surname: string
        username: string
        birthday: Date
        dni: number
      } = { ...prevUser }

      if (name === 'name' || name === 'surname') {
        prevUserData[name] = value
      }

      const updatedUser = new User(
        prevUserData.profileImg,
        prevUserData.name,
        prevUserData.surname,
        prevUserData.username,
        prevUserData.birthday,
        prevUserData.dni,
      )

      return updatedUser
    })
  }

  const handleSaveClick = async () => {
    await userService
      .updateUser(user)
      .then(() => {
        enqueueSnackbar('Datos guardados con exito', { variant: 'success', ...snackbarProfileOptions })
        fetchUserData()
      })
      .catch((error: AxiosError) => {
        enqueueSnackbar(errorHandler(error), snackbarProfileOptions)
      })
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
        <main className="main__content_user">
          <div className="user_data_container user-flex">
            <UserData user={user} handleInputChange={handleInputChange} age={age} handleSaveClick={handleSaveClick} />
            <div className="user_credit_container">
              <h3 className="text--md tx-aling-center credit" data-testid="credit">
                Crédito ${credit}
              </h3>
              <button
                className="add_credit-user-button button button--primary button--rounded animated text--spaced text--strong shadow--box"
                onClick={handleOpenModel}
              >
                Sumar crédito
              </button>
            </div>
          </div>
          <div className="user_display_container">
            <UserSelectionPanel content={content} onChange={(newValue: SelectionContent) => setContent(newValue)} />
            <Divider />
            <div className="content_container">
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
          </div>
        </main>
      )}
    </>
  )
}
