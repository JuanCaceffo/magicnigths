import './FriendsContent.css'

import { useEffect, useState } from 'react'
import { Friend } from 'models/interfaces/Friend'
import { FriendCard } from '../Card/Friend/FriendCard'
import { userService } from 'services/UserService'
import { AxiosError, isAxiosError } from 'axios'
import { closeSnackbar, enqueueSnackbar } from 'notistack'
import { errorHandler } from 'models/helpers/ErrorHandler'
import { snackbarProfileOptions } from 'pages/Profile/Profile'

export const FriendsContent = () => {
  const [friends, setFriends] = useState<Friend[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const userFriends = await userService.getFriends() //Datos del usuario del backend
        setFriends(userFriends)
      } catch (e) {
        // Mensaje de error en caso de que lo haya
        if (isAxiosError(e)) {
          if (e.message) {
            setErrorMessage(e.message)
          } else {
            setErrorMessage(e.response?.data.message)
          }
        } else {
          setErrorMessage(e as string)
        }
      }
    }

    fetchUserFriends()
    return () => {
      closeSnackbar()
    }
  }, []) // Array vacío como segundo argumento para indicar que se ejecute solo una vez

  // Método para manejar la eliminacion de un amigo
  const handleDeleteFriend = async (friendId: number) => {
    try {
      await userService.deleteFriend(friendId) // Llamada al método deleteFriend del userService con el ID del amigo
      // Actualización la lista de amigos después de eliminar
      setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId))
      enqueueSnackbar('Amigo eliminado con exito', { variant: 'success', ...snackbarProfileOptions })
    } catch (e) {
      enqueueSnackbar(errorHandler(e as AxiosError), snackbarProfileOptions)
    }
  }

  return (
    <>
      {errorMessage ? (
        <p className="error-message error">{errorMessage}</p>
      ) : (
        <div className="friends__container">
          {friends.map((friend, index) => (
            <FriendCard key={index} friend={friend} deleteFriend={handleDeleteFriend} />
          ))}
        </div>
      )}
    </>
  )
}
