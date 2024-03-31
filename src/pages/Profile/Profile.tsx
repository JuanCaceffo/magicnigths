import { Avatar, Container, Divider, Input, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Header } from 'src/components/Header/Header'
import { Page } from 'src/pages/Page/Page'
import '../../index.css'
import '../../styles/typography.scss'
import '../../styles/error.scss'
import './Profile.css'
import { PurchasedTicketContent } from 'src/components/TicketsContent/PurchasedTicketContent'
import { useEffect, useState } from 'react'
import { FriendsContent } from 'src/components/TicketsContent/FriendsContent'
import { CommentsContent } from 'src/components/TicketsContent/CommentsContent'
import { User } from 'src/data/model/User'
import { userService } from 'src/services/UserService'
import { isAxiosError } from 'axios'
import { differenceInYears } from 'date-fns'

export const Profile = () => {
  const [user, setUser] = useState(new User('Nombre', 'Apellido', new Date(2000,0,1), 0, '/mock-imgs/user-imgs/denise.jpeg'))
  const [credit, setCredit] = useState(0)
  const [age, setAge] = useState(0)
  const [content, setContent] = useState(SelectionContent.PURCHASED_TICKET)
  const [errorMessage, setError] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      // Obtener datos del usuario
      try {
        const userData = await userService.getUser() 
        setUser(userData)

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

    fetchUserData()
  }, [])  // Array vacío como segundo argumento para indicar que se ejecute solo una vez

  useEffect(() => {
    // Cálculo de la edad del usuario después de haber establecido el estado de user
    if (user.birthday) {
      const age = differenceInYears(new Date(), new Date(user.birthday))
      setAge(age)
    }
  }, [user]) 

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

    // Se crea un nuevo objeto igual al anterior pero con el nuevo valor del input
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleSaveClick = async () => {
    // TO DO: Implementar 
  }

  const handleAddCreditClick = async () => {
    const updatedCredit = await userService.addCreditToUser(100.0) // Hacer dinámico
    setCredit(updatedCredit)
  }

  return (
    <>
      <Page header={<Header />} content={
        errorMessage ? ( // Mostrar mensaje de error si hay un mensaje en errorMessage
          <p className="error-message error">{errorMessage}</p>
        ) : (
          <Container className='main__content_user'>
            <div className='user_data_container'>
              <Avatar className='user_profile_photo' src={user.img} />
              <h3 className='subtitle2'>Nombre</h3>
              <Input 
                className='login-input-field'
                name='name'
                data-testid='name'
                placeholder='Nombre'
                value={user.name}
                onChange={handleInputChange}
              ></Input>
              <h3 className='subtitle2'>Apellidos</h3>
              <Input 
                className='login-input-field'
                name='surname'
                data-testid='surname'
                placeholder='Apellidos'
                value={user.surname}
                onChange={handleInputChange}
              ></Input>
              <h3 className='subtitle2'>Fecha de nacimiento</h3>
              <Input 
                className='login-input-field'
                placeholder='Fecha de nacimiento'
                name='birthday'
                data-testid='birthday'
                value={user.birthday.toISOString().split('T')[0]}
                onChange={handleInputChange}
              ></Input>
              <h3 className='subtitle2' data-testid='age'>{age} años</h3>
              <button className='button save-user-data-button' onClick={handleSaveClick}>
                  Guardar
              </button>
              <h3 className='subtitle2'>DNI</h3>
              <Input 
                className='login-input-field'
                placeholder='DNI'
                name='dni'
                data-testid='dni'
                value={user.dni}
                onChange={handleInputChange}
              ></Input>
              <h3 className='subtitle2' data-testid='credit'>Crédito ${credit}</h3>
              <button className='button add_credit-user-button' onClick={handleAddCreditClick}>
                  Sumar crédito
              </button>
            </div>
            <div className='user_display_container'>
              <ToggleButtonGroup
                value={content}
                exclusive
                onChange={(_event, newValue) => setContent(newValue)}
                className='selection_panel'
              >
                <ToggleButton value={SelectionContent.PURCHASED_TICKET} className='subtitle selection_button' disableRipple>
                  Entradas compradas
                </ToggleButton>
                <ToggleButton value={SelectionContent.FRIENDS} className='subtitle2 selection_button' disableRipple>
                  Amigos
                </ToggleButton>
                <ToggleButton value={SelectionContent.COMMENTS} className='subtitle2 selection_button' disableRipple>
                  Comentario
                </ToggleButton>
              </ToggleButtonGroup>
              <Divider></Divider>
              <div className='content_container'>
                {content === SelectionContent.PURCHASED_TICKET && <PurchasedTicketContent />}
                {content === SelectionContent.FRIENDS && <FriendsContent />}
                {content === SelectionContent.COMMENTS && <CommentsContent />}
              </div>
            </div>
          </Container>
        )
      } />
    </>
  )
}

// Enum para los tipos de contenidos a mostrar
enum SelectionContent {
  PURCHASED_TICKET,
  FRIENDS, 
  COMMENTS
}
