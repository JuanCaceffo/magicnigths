/* eslint-disable indent */
import { User } from 'models/User'
import { userSessionStorage } from 'models/helpers/userSessionStorage'
import { Navbar } from 'components/Navbar/Navbar'
import { Logo } from 'components/Logo/Logo'
import { userService } from 'services/UserService'
import { useEffect, useState } from 'react'

export const Header = () => {
  const [user, setUser] = useState({} as User)
  const isAdmin = userSessionStorage.userIsAdmin()

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
      isAdmin
        ? {
            node: <>Admin</>,
            link: '/admin_dashboard',
          }
        : null,
      {
        node: <>Home</>,
        link: '/',
      },
      {
        node: <i className="fas fa-basket-shopping" />,
        link: '/shop',
      },
      loginOrProfile(),
    ].flatMap((item) => (item ? [{ node: item.node, link: item.link }] : [])),
  }

  return (
    <header className="main__header shadow--div">
      <Logo imgUrl={'/images/logominimal.png'} alt={'Noches Mágicas'} />
      <Navbar className={navbar.className} nodes={navbar.nodes} />
    </header>
  )
}
