import { Avatar, Divider, Input, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Header } from 'src/components/Header/Header'
import { Page } from 'src/pages/Page/Page'
import './Profile.css'
import { PurchasedTicketContent } from 'src/components/UserPurchasedTicketContent/PurchasedTicketContent'
import { useEffect, useState } from 'react'
import { FriendsContent } from 'src/components/UserFriendsContent/FriendsContent'
import { CommentsContent } from 'src/components/UserTicketsContent/CommentsContent'
import { User } from 'src/data/model/User'
import { userService } from 'src/services/UserService'
import { isAxiosError } from 'axios'
import { PopupCredit } from 'src/components/PopupCredit/PopupCredit'

//TODO: refactorizar componente por una solucion mas mantenible
export const Profile = () => {
  const [user, setUser] = useState(new User('', '', '', '', new Date(), 0))
  const [credit, setCredit] = useState(0)
  const [age, setAge] = useState(0)
  const [content, setContent] = useState(SelectionContent.PURCHASED_TICKET)
  const [errorMessage, setError] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false) // Estado para controlar si el popup está abierto

  useEffect(() => {
    fetchUserData()
  }, []) // Array vacío como segundo argumento para indicar que se ejecute solo una vez

  const fetchUserData = async () => {
    // Obtener datos del usuario
    try {
      const userData = await userService.getUser()
      setUser(userData)

      // Cálculo y seteo de la edad del usuario
      setAge(userData.getAge())

      // Obtener crédito del usuario
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

  // Menejo de error
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

      if (name == 'name' || name == 'surname') {
        prevUserData[name] = value
      }

      // Crea un nuevo objeto User con los datos actualizados
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

  //TODO: agregar el fetch de data a un context compartido con el header para que se actualizae automacticamente el nombre en el header
  const handleSaveClick = async () => {
    await userService.updateUser(user).then(() => {
      fetchUserData()
    })
    console.log(user)
  }

  const handleAddCredit = async (creditToAdd: number) => {
    const updatedCredit = await userService.addCreditToUser(creditToAdd) // Hacer dinámico
    setCredit(updatedCredit)
  }
  
  const handleOpenPupup = async () => {
    setIsPopupOpen(true)
    // const updatedCredit = await userService.addCreditToUser(100.0) // Hacer dinámico
    // setCredit(updatedCredit)
  }

  return (
    <>
      <Page
        header={<Header />}
        content={
          errorMessage ? ( // Mostrar mensaje de error si hay un mensaje en errorMessage
            <p className="error-message error">{errorMessage}</p>
          ) : (
            <main className="main__content_user">
              <div className="user_data_container user-flex">
                <div className="user_data user-flex">
                  <Avatar className="user_profile_photo" src={`/mock-imgs/user-imgs/${user.profileImg}`} />
                  <div className="input_container">
                    <h3 className="subtitle2">Nombre</h3>
                    <Input
                      className="input-field"
                      name="name"
                      data-testid="name"
                      placeholder="Nombre"
                      value={user.name}
                      onChange={handleInputChange}
                    ></Input>
                  </div>
                  <div className="input_container">
                    <h3 className="subtitle2">Apellidos</h3>
                    <Input
                      className="input-field"
                      name="surname"
                      data-testid="surname"
                      placeholder="Apellidos"
                      value={user.surname}
                      onChange={handleInputChange}
                    ></Input>
                  </div>
                  <div className="input_container">
                    <h3 className="subtitle2">Fecha de nacimiento</h3>
                    <Input
                      className="input-field"
                      placeholder="Fecha de nacimiento"
                      name="birthday"
                      data-testid="birthday"
                      value={user.birthday.toLocaleDateString('es-ES')}
                      onChange={handleInputChange}
                      disabled
                    ></Input>
                  </div>
                  <h3 className="user__age tx-aling-center user-flex text--xl" data-testid="age">
                    Edad: {age} años
                  </h3>
                  <div className="input_container">
                    <h3 className="subtitle2">DNI</h3>
                    <Input
                      className="input-field"
                      placeholder="DNI"
                      name="dni"
                      data-testid="dni"
                      value={user.dni}
                      onChange={handleInputChange}
                      disabled
                    ></Input>
                  </div>
                  <button className="button save-user-data-button" onClick={handleSaveClick}>
                    Guardar
                  </button>
                </div>
                <div className="user_credit_container">
                  <h3 className="text--xl tx-aling-center" data-testid="credit">
                    Crédito ${credit}
                  </h3>
                  <button className="button add_credit-user-button" onClick={handleOpenPupup}>
                    Sumar crédito
                  </button>
                </div>
              </div>
              <div className="user_display_container">
                <ToggleButtonGroup
                  value={content}
                  exclusive
                  onChange={(_event, newValue) => setContent(newValue)}
                  className="selection_panel"
                >
                  <ToggleButton
                    value={SelectionContent.PURCHASED_TICKET}
                    className="subtitle selection_button"
                    disableRipple
                  >
                    Entradas compradas
                  </ToggleButton>
                  <ToggleButton value={SelectionContent.FRIENDS} className="subtitle2 selection_button" disableRipple>
                    Amigos
                  </ToggleButton>
                  <ToggleButton value={SelectionContent.COMMENTS} className="subtitle2 selection_button" disableRipple>
                    Comentario
                  </ToggleButton>
                </ToggleButtonGroup>
                <Divider></Divider>
                <div className="content_container">
                  {content === SelectionContent.PURCHASED_TICKET && <PurchasedTicketContent />}
                  {content === SelectionContent.FRIENDS && <FriendsContent />}
                  {content === SelectionContent.COMMENTS && <CommentsContent />}
                </div>
                {isPopupOpen && <PopupCredit open={isPopupOpen} onSave={(creditToAdd) => handleAddCredit(creditToAdd)} onClose={() => setIsPopupOpen(false)} />}
              </div>
            </main>
          )
        }
      />
    </>
  )
}

// Enum para los tipos de contenidos a mostrar
enum SelectionContent {
  PURCHASED_TICKET,
  FRIENDS,
  COMMENTS,
}
