import { Container } from '@mui/material'
import { Logo } from 'src/components/Logo/Logo'
import { NodeItem } from 'src/components/Navbar/NodeItem'

const buttonClass = 'button button--icon button--shadow'

const footerLinks = [
  { node: <i className="fab fa-facebook" />, link: 'https://www.facebook.com', class: buttonClass },
  { node: <i className="fab fa-instagram" />, link: 'https://www.instagram.com', class: buttonClass },
  { node: <i className="fab fa-twitter" />, link: 'https://www.twitter.com', class: buttonClass },
  { node: <i className="fab fa-linkedin" />, link: 'https://www.linkedin.com', class: buttonClass },
  { node: <i className="fab fa-at" />, link: 'mailto:nochesmagicas@gmail.com', class: buttonClass },
]

export const Footer = () => {
  return (
    <Container className="main__footer">
      {footerLinks.map((link) => (
        <NodeItem
          key={link.link}
          node={link.node}
          link={link.link}
          className="text text--clear text--strong text--spaced shadow--item"
        />
      ))}
      <Logo className="shadow--item" imgUrl={'src/assets/images/logo/logo_minimal.png'} alt={'Noches Mágicas'} />
    </Container>
  )
}
