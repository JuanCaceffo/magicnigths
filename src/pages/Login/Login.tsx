import { Card, DialogActions, DialogContent } from '@mui/material'
import 'src/styles/button.scss'
import './Login.scss'
import { useState } from 'react'
import { UserLogin } from 'src/data/model/UserLogin'
import { userService } from 'src/services/UserService'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { Input } from '@mui/material'

export const Login = () => {
  const [userLogin, setUser] = useState(new UserLogin('', ''))
  const [errorMessage, setError] = useState('')

  const navigate = useNavigate()

  const HandleLoginClick = async () => {
    try {
      await userService.postUserLogin(userLogin)
      navigate('/user_profile')
    } catch (e) {
      if (isAxiosError(e)) {
        setError(e.response?.data.message)
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
        <img src="/images/" alt='Noches Magicas' />
        <h1 className="title">Noches Mágicas</h1>
        <form onSubmit={HandleLoginClick} onChange={() => setError('')}>
          <DialogContent className="login-content">
            <div className="login-input">
              <h3 className="subtitle2">Usuario</h3>
              <Input
                id="user"
                className="login-input-field"
                placeholder="Usuario"
                name="username"
                value={userLogin.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="login-input">
              <h3 className="subtitle2">Contraseña</h3>
              <Input
                id="pass"
                className="login-input-field"
                type="password"
                placeholder="Password"
                name="password"
                value={userLogin.password}
                onChange={handleInputChange}
              />
            </div>
          </DialogContent>
        </form>

        <p className="login-error">{errorMessage}</p>
        <DialogActions sx={{ justifyContent: 'space-around' }}>
          <button className="login-button button" type='submit' onClick={HandleLoginClick}>
            Ingresar
          </button>
        </DialogActions>
      </Card>
    </section>
  )
}
