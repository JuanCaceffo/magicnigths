import { Navigate } from 'react-router-dom'
import { FC, PropsWithChildren } from 'react'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'

export const ProtectedRouter: FC<PropsWithChildren> = ({ children }) => {
  return userSessionStorage.userIsLoged() ? children : <Navigate to={'/login'} />
}
