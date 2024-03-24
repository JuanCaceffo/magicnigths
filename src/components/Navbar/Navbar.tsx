import { useState } from 'react'
import './Navbar.scss'
import { Box } from '@mui/material'
import { NodeItem, NodeItemProps } from './NodeItem'

interface NavbarProps {
  className?: string
  nodes: NodeItemProps[]
}

export const Navbar = ({ ...props }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenu = () => {
    setMenuOpen(!menuOpen)
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

  return (
    <nav className="navbar">
      {!menuOpen && (
        <Box className={`navbar__hamburger ${props.className}`} onClick={handleMenu}>
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
      </ul>
    </nav>
  )
}
