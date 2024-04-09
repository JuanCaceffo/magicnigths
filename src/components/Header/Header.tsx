/* eslint-disable indent */
import { Navbar } from 'src/components/Navbar/Navbar'
import { Logo } from 'src/components/Logo/Logo'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'
import { userService } from 'src/services/UserService'
import { useEffect, useState } from 'react'
import { User } from 'src/data/model/User'

export const Header = () => {
  const [user, setUser] = useState({} as User)

  useEffect(() => {
    const fetchUserData = async () => {
      userService.getUser().then((user) => setUser(user))
    }

    userSessionStorage.userIsLoged() && fetchUserData()
  }, [])

  const loginOrProfile = () => {
    return userSessionStorage.userIsLoged()
      ? {
          node: (
            <section className="centered centered--spaced">
              <img className="profile-img" src={`/images/${user.profileImg}`} />
              <span>{`${user.username}`}</span>
            </section>
          ),
          link: '/user_profile',
        }
      : {
          node: (
            <>
              <i className="fas fa-user fa-rp" /> Login
            </>
          ),
          link: '/login',
        }
  }

  const navbar = {
    className: 'text text--xl text--clear text--stronger text--spaced-sm shadow--text',
    nodes: [
      {
        node: <>Home</>,
        link: '/',
      },
      {
        node: <i className="fas fa-basket-shopping" />,
        link: '/shop',
      },
      loginOrProfile(),
    ],
  }

  return (
    <header className="main__header shadow--div">
      <Logo imgUrl={'/images/logominimal.png'} alt={'Noches Mágicas'} />
      <Navbar className={navbar.className} nodes={navbar.nodes} />
    </header>
  )
}
