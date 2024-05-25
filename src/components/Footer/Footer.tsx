import { Logo } from 'components/Logo/Logo'
import { NodeItem } from 'components/Navbar/NodeItem'
import { currentYear } from 'models/helpers/getYear'

const textClass = 'text text--md text--clear text--strong text--spaced shadow--text'

const footerLinks = [
  { node: <i className="fab fa-facebook" />, link: 'https://www.facebook.com' },
  { node: <i className="fab fa-instagram" />, link: 'https://www.instagram.com' },
  { node: <i className="fab fa-twitter" />, link: 'https://www.twitter.com' },
  { node: <i className="fab fa-linkedin" />, link: 'https://www.linkedin.com' },
  { node: <i className="fab fa-at" />, link: 'mailto:nochesmagicas@gmail.com' },
]

export const Footer = () => {
  return (
    <footer className="main__footer">
      {footerLinks.map((link) => (
        <NodeItem key={link.link} node={link.node} link={link.link} className={textClass} newTab={true} />
      ))}
      <Logo className="shadow--png" imgUrl={'/images/logominimal.png'} alt={'Noches Mágicas'} />
      <span className={textClass}>/</span>
      <span className={textClass}>{currentYear()}</span>
    </footer>
  )
}
