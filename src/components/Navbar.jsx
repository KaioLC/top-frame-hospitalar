import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="abas">
      <NavLink to="/" className={({ isActive }) => isActive ? 'aba aba-ativa' : 'aba'}>
        Telemetria
      </NavLink>

    </nav>
  )
}

export default Navbar