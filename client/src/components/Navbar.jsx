import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAdmin, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/voitures', label: 'Voitures' },
    { to: '/vendre', label: 'Vendre ma voiture' },
    { to: '/a-propos', label: 'À propos' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" id="main-navbar">
      <div className="container navbar-inner">
      <Link to="/" className="navbar-logo" id="navbar-logo">
      <img src={logo} alt="AutoSmart Maroc" className="navbar-logo-img" />
      </Link>

        <ul
          className={`navbar-links ${mobileOpen ? 'open' : ''}`}
          id="navbar-mobile-menu"
          aria-hidden={!mobileOpen}
        >
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {isAdmin && (
            <li>
              <Link
                to="/admin"
                className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          )}
          <li className="navbar-mobile-actions">
            {isAdmin ? (
              <button className="btn btn-outline btn-sm" onClick={() => { logout(); setMobileOpen(false); }}>
                Déconnexion
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm" onClick={() => setMobileOpen(false)}>
                Déposer une annonce
              </Link>
            )}
          </li>
        </ul>

        <div className="navbar-actions">
          {isAdmin ? (
            <div className="navbar-user-menu">
              <Link to="/admin" className="navbar-icon-btn" id="admin-dashboard-link" title="Dashboard">
                <FiUser />
              </Link>
              <button className="btn btn-outline btn-sm" onClick={logout}>
                Déconnexion
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-icon-btn" id="login-link" title="Login">
                <FiUser />
              </Link>
              <Link to="/vendre" className="btn btn-primary btn-sm navbar-cta" id="navbar-cta">
                Déposer une annonce
              </Link>
            </>
          )}
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          id="navbar-hamburger"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="navbar-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
