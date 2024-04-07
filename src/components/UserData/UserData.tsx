import { Avatar } from '@mui/material'
import { User } from 'src/data/model/User'

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
        <label className="text text--light">Nombre</label>
        <input
          className="field field__rounded field__large text shadow--it"
          name="name"
          data-testid="name"
          placeholder="Nombre"
          value={user.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="input_container">
        <label className="text text--light">Apellidos</label>
        <input
          className="field field__rounded field__large text shadow--it"
          name="surname"
          data-testid="surname"
          placeholder="Apellidos"
          value={user.surname}
          onChange={handleInputChange}
        />
      </div>
      <div className="input_container">
        <label className="text text--light">Fecha de nacimiento</label>
        <input
          className="field field__rounded field__large text shadow--it"
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
        <label className="text text--light">DNI</label>
        <input
          className="field field__rounded field__large text shadow--it"
          placeholder="DNI"
          name="dni"
          data-testid="dni"
          value={user.dni}
          onChange={handleInputChange}
          disabled
        />
      </div>
      <button className="button save-user-data-button" onClick={handleSaveClick}>
          Guardar
      </button>
    </div>
  )
}

export default UserData
