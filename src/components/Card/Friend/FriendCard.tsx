import { Avatar } from '@mui/material'
import { FC, useState } from 'react'

import 'styles/typography.scss'
import './FriendCard.css'

import { Friend } from 'models/interfaces/Friend'
import { ModalDelete } from 'components/Modal/DeleteModal'

interface FriendCardProps {
  friend: Friend
  deleteFriend: (friendId: number) => void // Método para manejar la eliminación de un amigo
}

export const FriendCard: FC<FriendCardProps> = ({ friend, deleteFriend }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOnSubmint = () => {
    setIsModalOpen(false)
    deleteFriend(friend.id)
  }

  return (
    <>
      <div className="friend__container">
        <Avatar
          className="friend__photo"
          alt={`${friend.firstName} ${friend.lastName}`}
          src={`/images/${friend.profileImgUrl}`}
        />
        <div className="text text--md text--strong">
          {friend.firstName} {friend.lastName}
        </div>
        <button className="delete__button" onClick={() => setIsModalOpen(true)}>
          <i className="fas fa-trash fa--hot" />
        </button>
        <ModalDelete
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onSubmit={handleOnSubmint}
          elementName={friend.firstName}
        />
      </div>
    </>
  )
}
