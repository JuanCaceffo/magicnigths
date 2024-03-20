import { useState } from 'react'
import './Navbar.scss'
import { Link, NavLink } from 'react-router-dom'
import { Box } from '@mui/material'

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__title">
        <img src="src/assets/images/logo/logo_minimal.png" alt="Noches Mágicas" />
      </Link>
      <Box className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="navbar__icon fas fa-bars" />
      </Box>
      <ul className={menuOpen ? 'navbar--hamburger' : 'navbar--horizontal'}>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/">
            Home
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/shop">
            <i className="navbar__icon fas fa-store"></i>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/login">
            <i className="navbar__icon fas fa-user"></i> Login
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
