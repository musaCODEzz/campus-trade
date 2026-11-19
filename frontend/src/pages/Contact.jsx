import { useState } from 'react';
import { contactService } from '../services/api';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await contactService.sendMessage({ name, email, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setError('Unable to send message right now. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 my-md-4">
      <div
        className="mx-auto"
        style={{
          maxWidth: '560px',
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '40px 36px',
        }}
      >
        {/* Header matching screenshot */}
        <h1
          style={{
            fontSize: '2.4rem',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '-0.5px',
            marginBottom: '6px',
          }}
        >
          Get In Touch<span style={{ color: 'var(--accent-lime)' }}>.</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px' }}>
          Have an inquiry or need assistance with your campus listing? Reach out directly.
        </p>

        {/* Success Alert */}
        {success && (
          <div
            className="alert alert-success py-3 px-3 mb-4"
            style={{
              background: 'rgba(204, 255, 0, 0.08)',
              border: '1px solid rgba(204, 255, 0, 0.25)',
              color: 'var(--accent-lime)',
              fontSize: '0.92rem',
              borderRadius: '8px',
            }}
          >
            ✅ Thank you! Your message has been sent to our campus team.
          </div>
        )}

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

        {/* Form matching screenshot */}
        <form onSubmit={handleSubmit}>
          {/* Your Full Name */}
          <div className="mb-3">
            <label
              style={{
                color: '#777777',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              YOUR FULL NAME
            </label>
            <input
              type="text"
              required
              className="form-control-dark"
              placeholder="Musa Maxwell"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Campus Email */}
          <div className="mb-3">
            <label
              style={{
                color: '#777777',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              CAMPUS EMAIL
            </label>
            <input
              type="email"
              required
              className="form-control-dark"
              placeholder="musa@student.ac.ke"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Your Message */}
          <div className="mb-4">
            <label
              style={{
                color: '#777777',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              YOUR MESSAGE
            </label>
            <textarea
              required
              rows={4}
              className="form-control-dark"
              placeholder="How can our team help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-lime w-100 justify-content-center py-3"
            style={{ fontSize: '0.92rem', letterSpacing: '1.5px', fontWeight: '800' }}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {loading ? 'SENDING MESSAGE...' : 'SEND MESSAGE ↗'}
          </button>
        </form>
      </div>
    </div>
  );
}
