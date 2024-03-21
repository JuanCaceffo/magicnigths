import { NavLink } from 'react-router-dom'

export interface NodeItemProps {
  node: React.ReactNode
  link: string
  className?: string
  do?: () => void
}

export const NodeItem = ({ ...props }: NodeItemProps) => {
  return (
    <li className="navbar__item">
      <NavLink className={`navbar__link ${props.className}`} to={props.link} onClick={props.do}>
        {props.node}
      </NavLink>
    </li>
  )
}
