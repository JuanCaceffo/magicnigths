import { createContext, useState, useContext, ReactNode } from 'react'
import { userService } from 'src/services/UserService'

interface AuthContextType {
  isAdmin: boolean
  checkAdminStatus: () => Promise<void>
  logout: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  checkAdminStatus: async () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAdmin, setIsAdmin] = useState(false)

  const checkAdminStatus = async () => {
    setIsAdmin(await userService.isAdmin())
  }

  const logout = () => {
    setIsAdmin(false)
  }

  return <AuthContext.Provider value={{ isAdmin, checkAdminStatus, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de AuthProvider')
  }
  return context
}
