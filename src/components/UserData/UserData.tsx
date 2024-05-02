import { Avatar } from '@mui/material'
import { User } from 'src/data/model/User'
import './UserData.css'

interface UserDataProps {
  user: User
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSaveClick: () => void
  age: number
}

export const UserData: React.FC<UserDataProps> = ({ user, handleInputChange, handleSaveClick, age }) => {
  return (
    <div className="user_data user-flex">
      <Avatar className="user_profile_photo" src={`/images/${user.profileImg}`} />
      <div className="input_container">
        <label className="text text--strong text--md">Nombre</label>
        <input
          className="field field--rounded field--large animated text shadow--box"
          name="name"
          data-testid="name"
          placeholder="Nombre"
          value={user.name}
          onChange={handleInputChange}
          style={{ width: '100%' }}
        />
      </div>
      <div className="input_container">
        <label className="text text--strong text--md">Apellidos</label>
        <input
          className="field field--rounded field--large animated text shadow--box"
          name="surname"
          data-testid="surname"
          placeholder="Apellidos"
          value={user.surname}
          onChange={handleInputChange}
        />
      </div>
      <div className="input_container">
        <label className="text text--strong text--md">Fecha de nacimiento</label>
        <input
          className="field field--rounded field--large animated text shadow--box"
          placeholder="Fecha de nacimiento"
          name="birthday"
          data-testid="birthday"
          value={user.birthday.toLocaleDateString('es-ES')}
          onChange={handleInputChange}
          disabled
        />
      </div>
      <h3 className="user__age tx-aling-center user-flex text--strong" data-testid="age">
        Edad: {age} años
      </h3>
      <div className="input_container">
        <label className="text text--strong text--md">DNI</label>
        <input
          className="field field--rounded field--large animated text shadow--box"
          placeholder="DNI"
          name="dni"
          data-testid="dni"
          value={user.dni}
          onChange={handleInputChange}
          disabled
        />
      </div>
      <button
        className="save-user-data-button button button--primary button--rounded animated text--spaced text--strong shadow--box"
        onClick={handleSaveClick}
      >
        Guardar
      </button>
    </div>
  )
}

export default UserData
