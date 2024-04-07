import { Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { User } from 'src/data/model/User'
import { userService } from 'src/services/UserService'
import { isAxiosError } from 'axios'
import { PopupCredit } from 'src/components/PopupCredit/PopupCredit'
import { UserData } from 'src/components/UserData/UserData'
import { SelectionContent, UserSelectionPanel } from 'src/components/UserSelectionPanel/UserSelectionPanel'
import { PurchasedTicketContent } from 'src/components/UserPurchasedTicketContent/PurchasedTicketContent'
import { FriendsContent } from 'src/components/UserFriendsContent/FriendsContent'
import { CommentsContent } from 'src/components/UserTicketsContent/CommentsContent'
import './Profile.css'

export const Profile = () => {
  const [user, setUser] = useState(new User('', '', '', '', new Date(), 0))
  const [credit, setCredit] = useState(0)
  const [age, setAge] = useState(0)
  const [content, setContent] = useState(SelectionContent.PURCHASED_TICKET)
  const [errorMessage, setError] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    fetchUserData()
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
        prevUserData.dni
      )

      return updatedUser
    })
  }

  const handleSaveClick = async () => {
    await userService.updateUser(user).then(() => {
      fetchUserData()
    })
  }

  const handleAddCredit = async (creditToAdd: number) => {
    const updatedCredit = await userService.addCreditToUser(creditToAdd)
    setCredit(updatedCredit)
  }

  const handleOpenPupup = async () => {
    setIsPopupOpen(true)
  }

  return (
    <>
      {errorMessage ? (
        <p className="error-message error">{errorMessage}</p>
      ) : (
        <main className="main__content_user">
          <div className="user_data_container user-flex">
            <UserData
              user={user}
              handleInputChange={handleInputChange}
              age={age}
              handleSaveClick={handleSaveClick}
            />
            <div className="user_credit_container">
              <h3 className="text--md tx-aling-center" data-testid="credit">
                Crédito ${credit}
              </h3>
              <button className="button add_credit-user-button" onClick={handleOpenPupup}>
                Sumar crédito
              </button>
            </div>
          </div>
          <div className="user_display_container">
            <UserSelectionPanel
              content={content}
              onChange={(newValue: SelectionContent) => setContent(newValue)}
            />
            <Divider />
            <div className="content_container">
              {content === SelectionContent.PURCHASED_TICKET && <PurchasedTicketContent />}
              {content === SelectionContent.FRIENDS && <FriendsContent />}
              {content === SelectionContent.COMMENTS && <CommentsContent />}
            </div>
            {isPopupOpen && (
              <PopupCredit
                open={isPopupOpen}
                onSave={(creditToAdd) => handleAddCredit(creditToAdd)}
                onClose={() => setIsPopupOpen(false)}
              />
            )}
          </div>
        </main>
      )}
    </>
  )
}

