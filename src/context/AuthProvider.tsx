import { createContext, useState, useContext, FC, ReactNode } from 'react'
import { userService } from 'src/services/UserService'

interface AuthContextType {
  isAdmin: boolean
  checkAdminStatus: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  checkAdminStatus: async () => {},
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAdmin, setIsAdmin] = useState(false)

  const checkAdminStatus = async () => {
    setIsAdmin(await userService.isAdmin())
  }

  return <AuthContext.Provider value={{ isAdmin, checkAdminStatus }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de AuthProvider')
  }
  return context
}
