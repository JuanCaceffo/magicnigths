import { Avatar } from "@mui/material"
import { FC } from "react"
import { Friend } from "src/data/model/Friend"
import '../../styles/typography.scss'
import './FriendCard.css'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

interface FriendCardProps {
    friend: Friend
  }

export const FriendCard: FC<FriendCardProps>= ({ friend }) => {
  return (
    <>
      <div className="friend_container">
        <Avatar className='friend_photo' src={friend.img} />
        <div className="friend_data">{friend.name} {friend.surname}</div>
        <DeleteRoundedIcon></DeleteRoundedIcon>
      </div>
    </>
  )
}