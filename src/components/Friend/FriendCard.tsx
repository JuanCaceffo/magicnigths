import { Avatar } from '@mui/material'
import { FC } from 'react'
import { Friend } from 'src/data/model/Friend'
import '../../styles/typography.scss'
import './FriendCard.css'

interface FriendCardProps {
  friend: Friend
  deleteFriend: (friendId: number) => void // Método para manejar la eliminación de un amigo
}

export const FriendCard: FC<FriendCardProps> = ({ friend, deleteFriend }) => {
  const handleDeleteFriend = () => {
    deleteFriend(friend.id)
  }

  return (
    <>
      <div className="friend_container">
        <Avatar className="friend_photo" src={friend.img} />
        <div className="friend_data text text--strong">
          {friend.name} {friend.surname}
        </div>
        <button className="delete_button" onClick={handleDeleteFriend}>
          <i className="fas fa-trash fa--hot" />
        </button>
      </div>
    </>
  )
}
