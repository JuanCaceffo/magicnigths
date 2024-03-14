import { Button, CardContent, DialogActions, DialogContent } from '@mui/material'
import './Login.css' // Importa el archivo de estilos CSS
import { useState } from 'react'
import { CustomInput } from 'src/components/CustomInput/CustomInput'



export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [errorMessage, setError] = useState('')

  return (
    <>
      <CardContent>
        <h1 className="title">Noches Mágicas</h1>
        <DialogContent className="login-content">
          <div className="login-input">
            <h3 className="subtitle2">Usuario</h3>
            <CustomInput id="user" className="login-input-field" placeholder="Usuario" value={username} setValue={setUsername} />
          </div>
          <div className="login-input">
            <h3 className="subtitle2">Contraseña</h3>
            <CustomInput id="pass" className="login-input-field" placeholder="Password" value={password} setValue={setPassword}/>
          </div>
        </DialogContent>
        <p className="login-error"></p>
        <DialogActions className="login-button" sx={{ justifyContent: 'space-around' }}>
          <Button id="ingresar" variant="contained">Ingresar</Button>
        </DialogActions>
      </CardContent>
    </>
  )
}

