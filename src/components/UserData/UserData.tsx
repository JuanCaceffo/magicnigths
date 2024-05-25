import './UserData.scss'
import { Avatar } from '@mui/material'
import { User } from 'models/User'
import { useForm } from 'react-hook-form'
import { UserUpdateProps } from 'models/interfaces/UserProps'
import { useEffect } from 'react'

type UserDataProps = {
  user: User
  onSubmit: (data: UserUpdateProps) => void
}

export const UserData = (data: UserDataProps) => {
  const { user, onSubmit } = data

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserUpdateProps>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })

  useEffect(() => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
    })
  }, [user, reset])

  return (
    <div className="user-data">
      <Avatar className="user-data__profile-photo" src={`/images/${user.profileImgUrl}`} />
      <form className="user-data__form" onSubmit={handleSubmit(onSubmit)} data-testid="credit-form">
        <div className="user-data__input">
          <label className="text text--strong text--md">Nombre</label>
          <input {...register('firstName')} className="field field--rounded animated shadow--box" type="text" />
          {errors.firstName && <span className="text text--error">{errors.firstName.message}</span>}
        </div>
        <div className="user-data__input">
          <label className="text text--strong text--md">Apellido</label>
          <input {...register('lastName')} className="field field--rounded animated shadow--box" type="text" />
          {errors.lastName && <span className="text text--error">{errors.lastName.message}</span>}
        </div>
        <div className="user-data__input">
          <label className="text text--strong text--md">Fecha de nacimiento</label>
          <input
            className="field field--rounded shadow--box"
            placeholder="Fecha de nacimiento"
            name="birthday"
            data-testid="birthday"
            value={user.birthday.toLocaleDateString('es-ES')}
            disabled
          />
        </div>
        <h3 className="text text--strong text--md centered" data-testid="age">
          Edad: {user.age} años
        </h3>
        <div className="user-data__input">
          <label className="text text--strong text--md">DNI</label>
          <input
            className="field field--rounded shadow--box"
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
          className="button button--tall button--primary button--rounded animated text--spaced text--strong shadow--box"
          type="submit"
          data-testid="credit-submit"
        />
      </form>
    </div>
  )
}
