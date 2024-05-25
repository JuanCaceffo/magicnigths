import './Navbar.scss'
import { NodeItem, NodeItemProps } from './NodeItem'
import { userSessionStorage } from 'models/helpers/userSessionStorage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
interface NavbarProps {
  className?: string
  nodes: NodeItemProps[]
}

export const Navbar = ({ ...props }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = useNavigate()

  const handleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = () => {
    sessionStorage.clear()
    nav('/')
  }

  const closeIcon = () => {
    return (
      menuOpen && (
        <li className={`navbar__item navbar__item--close ${props.className}`}>
          <i className="fas fa-xmark" onClick={handleMenu} />
        </li>
      )
    )
  }

  const logoutIcon = () => {
    return (
      <li className={`navbar__item ${props.className}`} onClick={handleLogout}>
        <i className="fas fa-right-from-bracket" />
      </li>
    )
  }

  return (
    <nav className="navbar centered">
      {!menuOpen && (
        <Box className={`navbar__hamburger shadow shadow--text ${props.className}`} onClick={handleMenu}>
          <i className="fas fa-bars" />
        </Box>
      )}
      <ul className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
        {closeIcon()}
        {props.nodes.map((node) => (
          <NodeItem
            key={node.link}
            node={node.node}
            link={node.link}
            className={props.className ?? ''}
            do={node.do ?? undefined}
          />
        ))}
        {userSessionStorage.userIsLoged() && logoutIcon()}
      </ul>
    </nav>
  )
}
