import { useEffect, useState } from "react"
import { Friend } from "src/data/model/Friend"
import { FriendCard } from "../Friend/FriendCard"
import './FriendsContent.css'


export const FriendsContent = () => {
  const [friends, setFriends] = useState(
    [new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg'), 
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg'), 
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg'),
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg'),
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg'),
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg'),
      new Friend("Amigo1", "Apellido1", '/public/mock-imgs/user-imgs/juan.jpeg')])

  useEffect(() => {
    //const FetchFriends
  })

  return (
    <>
      <div className='friends_container'>
        {friends.map((friend, index) => (
          <FriendCard key={index} friend={friend} />
        ))}
      </div>
    </>
  )
}


