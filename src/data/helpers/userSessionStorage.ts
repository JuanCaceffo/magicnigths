class UserSessionStorage {
  USER_KEY_STORAGE = 'userLogedID'

  getUserId = () => {
    const idLogedUser = sessionStorage.getItem(this.USER_KEY_STORAGE)
    return idLogedUser ? +idLogedUser : -1
  }

  userIsLoged = () => this.getUserId() >= 0

  userIsAdmin = () => false //TODO: Implementar logica
}

export const userSessionStorage = new UserSessionStorage()
