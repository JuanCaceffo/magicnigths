import { Avatar, Container, Divider } from '@mui/material'
import { Header } from 'src/components/Header/Header'
import { Page } from 'src/pages/Page/Page'
import '../../index.css'
import '../../styles/typography.scss'
import './Profile.css'
import { CustomInput } from 'src/components/CustomInput/CustomInput'
import { PurchasedTicketContent } from 'src/components/TicketsContent/PurchasedTicketContent'
import { useState } from 'react'
import { FriendsContent } from 'src/components/TicketsContent/FriendsContent'
import { CommentsContent } from 'src/components/TicketsContent/CommentsContent'

export const Profile = () => {
  const [name, setName] = useState('Nombre de usuario')
  const [surname, setSurname] = useState('Apellido de usuario')
  const [birthday, setBirthday] = useState('01/01/1900')
  const  [dni, setDni] = useState('dni')
  const [credit, setCredit] = useState(0)
  const [content, setContent] = useState(SelectionContent.PURCHASED_TICKET)

  const handleSaveClick = async () => {
    // TO DO: Implementar 
  }

  const handleAddCreditClick = async () => {
    // TO DO: Implementar
    setCredit(0)
  }

  return (
    <>
      <Page header={<Header />} content={
        <Container className='main__content_user'>
          <div className='user_data_container'>
            <Avatar className='user_profile_photo' src='/mock-imgs/user-imgs/denise.jpeg' />
            <h3 className='subtitle2'>Nombre</h3>
            <CustomInput 
              id='user_name'
              className='login-input-field'
              placeholder='Nombre'
              value={name}
              setValue={setName}
            ></CustomInput>
            <h3 className='subtitle2'>Apellidos</h3>
            <CustomInput 
              id='user_surname'
              className='login-input-field'
              placeholder='Apellidos'
              value={surname}
              setValue={setSurname}
            ></CustomInput>
            <h3 className='subtitle2'>Fecha de nacimiento</h3>
            <CustomInput 
              id='user_birthday'
              className='login-input-field'
              placeholder='Fecha de nacimiento'
              value={birthday}
              setValue={setBirthday}
            ></CustomInput>
            <h3 className='subtitle2'>Edad</h3>
            <p>x años</p>
            <button className='button save-user-data-button' onClick={handleSaveClick}>
                Guardar
            </button>
            <h3 className='subtitle2'>DNI</h3>
            <CustomInput 
              id='user_dni'
              className='login-input-field'
              placeholder='DNI'
              value={dni}
              setValue={setDni}
            ></CustomInput>
            <h3 className='subtitle2'>Crédito ${credit}</h3>
            <button className='button add_credit-user-button' onClick={handleAddCreditClick}>
                Sumar crédito
            </button>
          </div>
          <div className='user_display_container'>
            <div className='selection_panel'>
              <p className='subtitle selection_button' onClick={ () => setContent(SelectionContent.PURCHASED_TICKET) }>Entradas compradas</p>
              <p className='subtitle2 selection_button' onClick={ () => setContent(SelectionContent.FRIENDS) }>Amigos</p>
              <p className='subtitle2 selection_button' onClick={ () => setContent(SelectionContent.COMMENTS) }>Comentario</p>
            </div>
            <Divider></Divider>
            {content === SelectionContent.PURCHASED_TICKET && <PurchasedTicketContent />}
            {content === SelectionContent.FRIENDS && <FriendsContent />}
            {content === SelectionContent.COMMENTS && <CommentsContent />}
          </div>
        </Container>} />
    </>
  )
  
}

// Enum para los tipos de contenidos a mostrar
enum SelectionContent {
  PURCHASED_TICKET,
  FRIENDS, 
  COMMENTS
}