import { Button, Card, CardContent, DialogActions, DialogContent } from '@mui/material'
import './Login.css' // Importa el archivo de estilos CSS
import { useState } from 'react'
import { CustomInput } from 'src/components/CustomInput/CustomInput'
import { UserLogin } from 'src/data/model/UserLogin'
import { loginService } from 'src/services/LoginService'
import { useNavigate } from 'react-router-dom'


export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setError] = useState('')

  const navigate = useNavigate()

  const HandleLoginClick = async () => {
    const userLogin = new UserLogin(username, password) 
           
    try {
      await loginService.postUserLogin(userLogin)
      navigate("/login/")
    } 
    catch (e: unknown) {
      setError((e as Error).message)
    }

  }

  return (
    <>
      <div className="login-container">
        <Card>
          <CardContent >
            <h1 className="title">Noches Mágicas</h1>
            <DialogContent className="login-content">
              <div className="login-input">
                <h3 className="subtitle2">Usuario</h3>
                <CustomInput id="user" className="login-input-field" placeholder="Usuario" value={username} setValue={setUsername} />
              </div>
              <div className="login-input">
                <h3 className="subtitle2">Contraseña</h3>
                <CustomInput id="pass" className="login-input-field" type='password' placeholder="Password" value={password} setValue={setPassword}/>
              </div>
            </DialogContent>
            <p className="login-error">{errorMessage}</p>
            <DialogActions  sx={{ justifyContent: 'space-around' }}>
              <Button className="login-button" variant="contained" onClick={HandleLoginClick}>Ingresar</Button>
            </DialogActions>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

