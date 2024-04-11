import './Login.scss'
import { Card } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import { userService } from 'src/services/UserService'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { Input } from '@mui/material'

interface LoginData {
  username: string
  password: string
}

export const Login = () => {
  const [userLogin, setUserLogin] = useState<LoginData>({ username: '', password: '' })
  const [errorMessage, setError] = useState<string | null>(null)
  const redirectTo = useLocation().state
  const navigate = useNavigate()
  useEffect(() => {
    sessionStorage.clear()
  })

  const HandleLoginClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await userService.postUserLogin(userLogin)
      console.log(redirectTo.pathname, redirectTo.search)
      navigate(redirectTo ? `${redirectTo.pathname}${redirectTo.search}` : '/home')
    } catch (err) {
      setError((err as AxiosError).message)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // Se crea un nuevo objeto igual al anterior pero con el nuevo valor del input
    setUserLogin((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  return (
    <section className="main__content main__content--login">
      <Card className="card shadow shadow--big">
        <img className="card__logo" src="/images/logo.png" alt="Noches Magicas" />
        <form className="card__form" onSubmit={HandleLoginClick}>
          <div className="card__input">
            <label className="text text--light">Usuario</label>
            <Input className="card__field" name="username" value={userLogin.username} onChange={handleInputChange} />
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
          {errorMessage && <span className="card__error">{errorMessage}</span>}
          <button className="button button--tall shadow--box" type="submit">
            Ingresar
          </button>
        </form>
      </Card>
    </section>
  )
}
