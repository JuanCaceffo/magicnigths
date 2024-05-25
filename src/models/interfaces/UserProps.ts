export interface UserLoginProps {
  id: number
  role: UserRole
}

enum UserRole {
  ADMIN, USER
}

export interface UserProps {
  id?: number
  profileImgUrl?: string
  firstName?: string
  lastName?: string
  username?: string
  birthday?: Date
  dni?: number
}

export interface UserUpdateProps {
  firstName: string
  lastName: string
}

