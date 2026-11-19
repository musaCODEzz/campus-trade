import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg ct-navbar sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand ct-brand">
          CT<span>.</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links (Right-aligned like Screenshot 1) */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link to="/about" className="nav-link nav-link-custom">
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link nav-link-custom">
                MARKETPLACE
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link nav-link-custom">
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
                  <Link to="/products/add" className="btn-outline-custom">
                    POST AD
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link nav-link-custom">
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn-lime">
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