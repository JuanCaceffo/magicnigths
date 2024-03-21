import { Container } from '@mui/material'
import { Navbar } from 'src/components/Navbar/Navbar'
import { Logo } from 'src/components/Logo/Logo'

const navbar = {
  className: 'text text--md text--clear text--strong text--spaced shadow--item',
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
    <Container className="main__header">
      <Logo className="shadow--item" imgUrl={'src/assets/images/logo/logo_minimal.png'} alt={'Noches Mágicas'} />
      <Navbar className={navbar.className} nodes={navbar.nodes} />
    </Container>
  )
}
