import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function Register({ setUser }) {
  const navigate = useNavigate();

  // Controlled component states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 1. Client-side Validation: check password match
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // 2. Call Register API in Django
      await authService.register(username, email, password);

      // 3. Auto-login immediately after successful registration
      const userData = await authService.login(username, password);
      setUser(userData);

      // 4. Redirect to Marketplace
      navigate('/products');
    } catch (err) {
      // 5. Handle Django DRF 400 validation errors
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.username) {
          setError(`Username: ${data.username[0]}`);
        } else if (data.email) {
          setError(`Email: ${data.email[0]}`);
        } else if (data.password) {
          setError(`Password: ${data.password[0]}`);
        } else {
          setError('Registration failed. Please check your details.');
        }
      } else {
        setError('Cannot connect to authentication server. Is Django running?');
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
            Create Account<span style={{ color: 'var(--accent-lime)' }}>.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            Join your fellow students trading safely on campus.
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label-dark">Student Username</label>
            <input
              type="text"
              required
              className="form-control-dark"
              placeholder="e.g. musa_dev"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label-dark">Campus / Personal Email</label>
            <input
              type="email"
              required
              className="form-control-dark"
              placeholder="e.g. student@university.ac.ke"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label-dark">Password</label>
            <input
              type="password"
              required
              className="form-control-dark"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label-dark">Confirm Password</label>
            <input
              type="password"
              required
              className="form-control-dark"
              placeholder="Re-type your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
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
            {loading ? 'CREATING ACCOUNT...' : 'REGISTER ACCOUNT →'}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 0 }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{ color: 'var(--accent-lime)', fontWeight: '700', textDecoration: 'none' }}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}