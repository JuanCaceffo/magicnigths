import { Navigate, useLocation } from 'react-router-dom'
import { FC, PropsWithChildren } from 'react'
import { userSessionStorage } from 'models/helpers/userSessionStorage'

export const ProtectedRouter: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation()

  return userSessionStorage.userIsLoged() ? children : <Navigate to={'/login'} replace state={location} />
}
