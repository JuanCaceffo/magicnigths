import { Avatar } from '@mui/material'
import { User } from 'models/User'
import './UserData.css'
import { useForm } from 'react-hook-form'
import { UserUpdateProps } from 'models/interfaces/UserProps'

type UserDataProps = {
  user: User
  onSubmit: (data: UserUpdateProps) => void
}

export const UserData = (data: UserDataProps) => {
  const { user, onSubmit } = data

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserUpdateProps>()

  return (
    <div className="user_data user-flex">
      <Avatar className="user_profile_photo" src={`/images/${user.profileImgUrl}`} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="credit-form"
      >
        <div className="input_container">
          <label className="text text--strong text--md">Nombre</label>
          <input
            value={user.firstName}
            {...register('firstName')}
            className="field field--rounded field--large animated text shadow--box"
            type="text"
          />
          {errors.firstName && <span className="text text--error">{errors.firstName.message}</span>}
        </div>
        <div className="input_container">
          <label className="text text--strong text--md">Apellido</label>
          <input
            value={user.lastName}
            {...register('lastName')}
            className="field field--rounded field--large animated text shadow--box"
            type="text"
          />
          {errors.lastName && <span className="text text--error">{errors.lastName.message}</span>}
        </div>
        <div className="input_container">
          <label className="text text--strong text--md">Fecha de nacimiento</label>
          <input
            className="field field--rounded field--large animated text shadow--box"
            placeholder="Fecha de nacimiento"
            name="birthday"
            data-testid="birthday"
            value={user.birthday.toLocaleDateString('es-ES')}
            disabled
          />
        </div>
        <h3 className="user__age tx-aling-center user-flex text--strong" data-testid="age">
          Edad: {user.age} años
        </h3>
        <div className="input_container">
          <label className="text text--strong text--md">DNI</label>
          <input
            className="field field--rounded field--large animated text shadow--box"
            placeholder="DNI"
            name="dni"
            data-testid="dni"
            value={user.dni}
            disabled
          />
        </div>
        <input
          value={'GUARDAR'}
          disabled={isSubmitting}
          className="save-user-data-button button button--primary button--rounded animated text--spaced text--strong shadow--box"
          type="submit"
          data-testid="credit-submit"
        />
      </form>
    </div>
  )
}

export default UserData
