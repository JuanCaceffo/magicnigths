import { Button, CardContent, DialogActions, DialogContent, Input } from '@mui/material'
import './Login.css' // Importa el archivo de estilos CSS

interface CardShowBaseProps {
  title: string
}

const Login: React.FC<CardShowBaseProps> = () => {
  return (
    <>
      <CardContent>
        <h1 className="title">Noches Mágicas</h1>
        <DialogContent className="login-content">
          <div className="login-input">
            <h3 className="subtitle2">Usuario</h3>
            <Input id="user" className="login-input-field" placeholder="Usuario" type="username" />
          </div>
          <div className="login-input">
            <h3 className="subtitle2">Contraseña</h3>
            <Input id="pass" className="login-input-field" placeholder="Password" type="password" />
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

export default Login
