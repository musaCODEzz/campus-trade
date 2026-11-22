import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    closeMenu();
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg ct-navbar sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand ct-brand" onClick={closeMenu}>
          CT<span>.</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-secondary"
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links (Right-aligned like Screenshot 1) */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link to="/about" className="nav-link nav-link-custom" onClick={closeMenu}>
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link nav-link-custom" onClick={closeMenu}>
                MARKETPLACE
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link nav-link-custom" onClick={closeMenu}>
                CONTACT
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link nav-link-custom bg-transparent border-0"
                    style={{ cursor: 'pointer' }}
                  >
                    LOGOUT
                  </button>
                </li>
                <li className="nav-item">
                  <Link to="/products/add" className="btn-outline-custom" onClick={closeMenu}>
                    POST AD
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link nav-link-custom" onClick={closeMenu}>
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn-lime" onClick={closeMenu}>
                    REGISTER
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
