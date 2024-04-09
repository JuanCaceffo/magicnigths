import { Link } from 'react-router-dom'
import './Logo.scss'

interface LogoProps {
  imgUrl: string
  alt: string
  className?: string
}

export const Logo = ({ ...props }: LogoProps) => {
  return (
    <Link to="/" className={`logo ${props.className ?? ''}`}>
      <img className="shadow shadow__png" src={props.imgUrl} alt={props.alt} />
    </Link>
  )
}
