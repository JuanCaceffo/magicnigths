class UserSessionStorage {
  USER_KEY_STORAGE = 'userLogedID'
  USER_ADMIN_STATUS = 'adminStatus'

  getUserId = () => {
    const idLogedUser = sessionStorage.getItem(this.USER_KEY_STORAGE)
    return idLogedUser ? +idLogedUser : 0
  }

  userIsLoged = () => this.getUserId() > 0

  userIsAdmin = () => sessionStorage.getItem(this.USER_ADMIN_STATUS) === 'true'
}

export const userSessionStorage = new UserSessionStorage()
