import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

 

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Mi Biblioteca
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-item">Inicio</Link>
          
          {usuario ? (
            <>
              <Link to="/biblioteca" className="nav-item">Mi Biblioteca</Link>
              <span className="nav-welcome">Hola, {usuario.nombre}</span>
              <button onClick={handleLogout} className="nav-logout">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Iniciar Sesión</Link>
              <Link to="/registro" className="nav-item">Registrarse</Link>
            </>
          )}
          
          <Link to="/contacto" className="nav-item">Contacto</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;