import './index.css'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'
import { StyledEngineProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider injectFirst>
    <RouterProvider router={router} />
    <SnackbarProvider
      className="snackbar"
      variant="error"
      autoHideDuration={4000}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    />
  </StyledEngineProvider>,
)
