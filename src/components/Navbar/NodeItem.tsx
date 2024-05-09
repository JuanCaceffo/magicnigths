import { NavLink } from 'react-router-dom'

export interface NodeItemProps {
  node: React.ReactNode
  link: string
  className?: string
  do?: () => void
  newTab?: boolean
}

export const NodeItem = ({ ...props }: NodeItemProps) => {
  return (
    <li className="navbar__item">
      <NavLink
        className={`navbar__link ${props.className}`}
        to={props.link}
        onClick={props.do}
        target={props.newTab ? '_blank' : ''}
      >
        {props.node}
      </NavLink>
    </li>
  )
}
