import { Container } from '@mui/material'
import { Logo } from 'src/components/Logo/Logo'
import { Navbar } from '../Navbar/Navbar'

const buttonClass = 'button button--icon button--shadow'

const nav = [
  { node: <i className="fab fa-facebook" />, link: 'https://www.facebook.com', class: buttonClass },
  { node: <i className="fab fa-instagram" />, link: 'https://www.instagram.com', class: buttonClass },
  { node: <i className="fab fa-twitter" />, link: 'https://www.twitter.com', class: buttonClass },
  { node: <i className="fab fa-linkedin" />, link: 'https://www.linkedin.com', class: buttonClass },
  { node: <i className="fab fa-at" />, link: 'mailto:nochesmagicas@gmail.com', class: buttonClass },
]

export const Footer = () => {
  return (
    <Container className="main__footer">
      {/* <Navbar items={nav} /> */}
      <Logo imgUrl={'src/assets/images/logo/logo_minimal.png'} alt={'Noches Mágicas'} class="button button--shadow" />
    </Container>
  )
}
