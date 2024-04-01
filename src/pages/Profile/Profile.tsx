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

    fetchUserData()
  }, [])  // Array vacío como segundo argumento para indicar que se ejecute solo una vez

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
              <div className='user_data'>
                <Avatar className='user_profile_photo' src={user.img} />
                <div className='input_container'>
                  <h3 className='subtitle2'>Nombre</h3>
                  <Input 
                    className='input-field'
                    name='name'
                    data-testid='name'
                    placeholder='Nombre'
                    value={user.name}
                    onChange={handleInputChange}
                  ></Input>
                </div>
                <div className='input_container'>
                  <h3 className='subtitle2'>Apellidos</h3>
                  <Input 
                    className='input-field'
                    name='surname'
                    data-testid='surname'
                    placeholder='Apellidos'
                    value={user.surname}
                    onChange={handleInputChange}
                  ></Input>
                </div>
                <div className='input_container'>
                  <h3 className='subtitle2'>Fecha de nacimiento</h3>
                  <Input 
                    className='input-field'
                    placeholder='Fecha de nacimiento'
                    name='birthday'
                    data-testid='birthday'
                    value={user.birthday.toLocaleDateString('es-ES')}
                    onChange={handleInputChange}
                    disabled
                  ></Input>
                </div>
                <h3 className='subtitle2' data-testid='age'>Edad: {age} años</h3>
                <div className='input_container'>
                  <h3 className='subtitle2'>DNI</h3>
                  <Input 
                    className='input-field'
                    placeholder='DNI'
                    name='dni'
                    data-testid='dni'
                    value={user.dni}
                    onChange={handleInputChange}
                    disabled
                  ></Input>
                </div>
                <button className='button save-user-data-button' onClick={handleSaveClick}>
                  Guardar
                </button>
              </div>
              <div className='user_credit_container'>
                <h3 className='subtitle2' data-testid='credit'>Crédito ${credit}</h3>
                <button className='button add_credit-user-button' onClick={handleAddCreditClick}>
                  Sumar crédito
                </button>
              </div>
              
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
