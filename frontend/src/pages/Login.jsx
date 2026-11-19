import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Login({ setUser }) {
  const navigate = useNavigate();

  // Controlled component states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // UI status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Call login API (fetches JWT tokens & user info)
      const userData = await authService.login(username, password);

      // 2. Update global app user state
      setUser(userData);

      // 3. Navigate to Marketplace
      navigate('/products');
    } catch (err) {
      // If Django returns 401, display friendly error
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError('Unable to reach authentication server. Is Django running?');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="auth-container">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
            Welcome Back<span style={{ color: 'var(--accent-lime)' }}>.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            Sign in to manage listings and chat with campus buyers.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="alert alert-danger py-2 px-3 mb-4"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.88rem',
              borderRadius: '6px',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-3">
            <label className="form-label-dark">Username</label>
            <input
              type="text"
              required
              className="form-control-dark"
              placeholder="e.g. musa3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="form-label-dark">Password</label>
            <input
              type="password"
              required
              className="form-control-dark"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-lime w-100 justify-content-center py-3"
            style={{ fontSize: '0.9rem', letterSpacing: '1px' }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {loading ? 'LOGGING IN...' : 'LOG IN →'}
          </button>
        </form>

        {/* Footer Link to Register */}
        <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 0 }}>
            Don&apos;t have an account yet?{' '}
            <Link
              to="/register"
              style={{ color: 'var(--accent-lime)', fontWeight: '700', textDecoration: 'none' }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}