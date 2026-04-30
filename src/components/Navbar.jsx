import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'aba aba-ativa' : 'aba'}>
        Telemetria
      </NavLink>
      <NavLink to="/missoes" className={({ isActive }) => isActive ? 'aba aba-ativa' : 'aba'}>
        Missões
      </NavLink>
      <NavLink to="registros" className={({ isActive }) => isActive ? 'aba aba-ativa' : 'aba'}>
        Registros
      </NavLink>
    </nav>
  )
}

export default Navbar