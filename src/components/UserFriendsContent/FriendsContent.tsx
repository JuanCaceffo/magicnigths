import { useEffect, useState } from "react"
import { Friend } from "src/data/model/Friend"
import { FriendCard } from "../Friend/FriendCard"
import '../../styles/error.scss'
import './FriendsContent.css'
import { userService } from "src/services/UserService"
import { isAxiosError } from "axios"


export const FriendsContent = () => {
  const [friends, setFriends] = useState<Friend[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const userFriends = await userService.getFriends() //Datos del usuario del backend
        setFriends(userFriends)
      } catch (e) {
        console.log(e)
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
  }, []) // Array vacío como segundo argumento para indicar que se ejecute solo una vez

  // Método para manejar la eliminacion de un amigo
  const handleDeleteFriend = async (friendId: number) => {
    try {
      await userService.deleteFriend(friendId) // Llamada al método deleteFriend del userService con el ID del amigo
      // Actualización la lista de amigos después de eliminar
      setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId))
    } catch (e) {
      console.error("Error al eliminar amigo:", e)
    }
  }

  return (
    <>
      {errorMessage ? (
        <p className="error-message error">{errorMessage}</p>
      ) : (
        <div className='friends_container'>
          {friends.map((friend, index) => (
            <FriendCard key={index} friend={friend} deleteFriend={handleDeleteFriend}/>
          ))}
        </div>
      )}
    </>
  )
}
