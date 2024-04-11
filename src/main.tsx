import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'
import { StyledEngineProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from './context/AuthProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <RouterProvider router={router} />
        <SnackbarProvider
          className="snackbar"
          variant="error"
          autoHideDuration={4000}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        />
      </AuthProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
