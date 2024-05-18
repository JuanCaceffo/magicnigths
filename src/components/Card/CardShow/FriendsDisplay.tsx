import { userSessionStorage } from 'src/data/helpers/userSessionStorage'
import { Show } from 'src/data/model/Show'

type Props = {
  show: Show
}

export const FriendsDisplay = ({ show }: Props) => {
  const defaultMessage = !userSessionStorage.getUserId() ? '' : 'No asisten amigos'

  if (!userSessionStorage.getUserId() || !show.totalFriendsAttending)
    return <p className="card__friends centered">{defaultMessage} </p>

  return (
    <section className="card__friends centered">
      <span className="text--strong">Asisten:</span>
      <span className="card__friends--img">
        {show.friendsImgs.map((path) => (
          <img key={path} className="profile-img profile-img__small shadow--png" src={`/images/${path}`} />
        ))}
      </span>
      {<span data-testid="more-friends">{!!show.restFriends ? `+ ${show.restFriends} amigos` : 'amigos'}</span>}
    </section>
  )
}
