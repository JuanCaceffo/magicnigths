export interface UserLoginProps {
  id: number
  role: UserRole
}

enum UserRole {
  ADMIN, USER
}
