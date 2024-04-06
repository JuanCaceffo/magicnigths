import { Card } from '@mui/material'
import 'src/styles/button.scss'
import './Login.scss'
import { useState } from 'react'
import { UserLogin } from 'src/data/model/UserLogin'
import { userService } from 'src/services/UserService'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { Input } from '@mui/material'
import { ErrorHandler } from 'src/error/ErrorHandler'

export const Login = () => {
  const [userLogin, setUser] = useState(new UserLogin('', ''))
  const [errorMessage, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  const HandleLoginClick = async () => {
    try {
      await userService.postUserLogin(userLogin)
      navigate('/user_profile')
    } catch (e) {
      if (isAxiosError(e)) {
        ErrorHandler(e, setError)
      }
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

  return (
    <section className="main__content main__content--login">
      <Card className="card shadow shadow--big">
        <img className="card__logo" src="/images/logo.png" alt='Noches Magicas' />
        <form className="card__form" onSubmit={HandleLoginClick}>
          <div className="card__input">
            <label className="text text--light">Usuario</label>
            <Input
              className="card__field"
              name="username"
              value={userLogin.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="card__input">
            <label className="text text--light">Contraseña</label>
            <Input
              className="card__field"
              type="password"
              name="password"
              value={userLogin.password}
              onChange={handleInputChange}
            />
          </div>
          <button className="card__button button shadow--box" type='submit' onClick={HandleLoginClick}>
            Ingresar
          </button>
        </form>
        {errorMessage && <p className="card__error">{errorMessage}</p>}
      </Card>
    </section>
  )
}
