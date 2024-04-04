import { Navbar } from 'src/components/Navbar/Navbar'
import { Logo } from 'src/components/Logo/Logo'

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
    {
      node: (
        <>
          <i className="fas fa-user"></i> Login
        </>
      ),
      link: '/login',
    },
  ],
}

export const Header = () => {
  return (
    <header className="main__header shadow">
      <Logo className="shadow--item" imgUrl={'/images/logominimal.png'} alt={'Noches Mágicas'} />
      <Navbar className={navbar.className} nodes={navbar.nodes} />
    </header>
  )
}
