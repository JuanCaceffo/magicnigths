/* eslint-disable indent */
import { Navbar } from 'src/components/Navbar/Navbar'
import { Logo } from 'src/components/Logo/Logo'
import { userSessionStorage } from 'src/data/helpers/userSessionStorage'
import { userService } from 'src/services/UserService'
import { useEffect, useState } from 'react'
import { User } from 'src/data/model/User'
import './Header.scss'

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
            <section className="proflie-item">
              <img className="profile-picture" src={`/mock-imgs/user-imgs/${user.profileImg}`} />{' '}
              {`${user.name} ${user.surname}`}
            </section>
          ),
          link: '/user_profile',
        }
      : {
          node: (
            <>
              <i className="fas fa-user"></i> Login
            </>
          ),
          link: '/login',
        }
  }

  const navbar = {
    className: 'text text--xl text--clear text--strong text--spaced shadow--item',
    nodes: [
      {
        node: <>Home</>,
        link: '/',
      },
      {
        node: <i className="fas fa-store" />,
        link: '/shop',
      },
      loginOrProfile(),
    ],
  }

  return (
    <header className="main__header shadow">
      <Logo className="shadow--item" imgUrl={'src/assets/images/logo/logominimal.png'} alt={'Noches Mágicas'} />
      <Navbar className={navbar.className} nodes={navbar.nodes} />
    </header>
  )
}
