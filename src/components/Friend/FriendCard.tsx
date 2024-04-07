import { Avatar } from "@mui/material"
import { FC } from "react"
import { Friend } from "src/data/model/Friend"
import '../../styles/typography.scss'
import './FriendCard.css'
import DeleteIcon from '@mui/icons-material/DeleteRounded'

interface FriendCardProps {
    friend: Friend
    deleteFriend: (friendId: number) => void // Método para manejar la eliminación de un amigo
  }

export const FriendCard: FC<FriendCardProps>= ({ friend, deleteFriend }) => {
  const handleDeleteFriend = () => {
    deleteFriend(friend.id)
  }

  return (
    <>
      <div className="friend_container">
        <Avatar className='friend_photo' src={`/images/${friend.img}`}/>
        <div className="friend_data">{friend.name} {friend.surname}</div>
        <button className="delete_button" onClick={handleDeleteFriend}>
          <DeleteIcon></DeleteIcon>
        </button>
      </div>
    </>
  )
}