import { useState } from 'react';
import { signup } from '../api/authApi.js';
import '../components/bloodbank.css';

function Signup({ onSubmit, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await signup({ email: email.trim(), password });
      setSuccess('Account created successfully! Please sign in with your new credentials.');
      setEmail('');
      setPassword('');
      if (onSubmit) {
        onSubmit(response);
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bb-form" style={{ maxWidth: '420px', margin: '0 auto', width: '100%' }}>
      <div className="bb-form__header" style={{ marginBottom: '1rem' }}>
        <span className="bb-form__eyebrow">New Registration</span>
        <h2 className="bb-form__title" style={{ fontSize: '1.6rem' }}>Create Account</h2>
        <p className="bb-form__subtitle" style={{ fontSize: '0.9rem' }}>
          Register with your email to manage donations, requests, and inventory.
        </p>
      </div>

      {success && (
        <div className="bb-alert bb-alert--success" role="status">
          {success}
          <div style={{ marginTop: '0.75rem' }}>
            <button
              className="bb-button bb-button--primary bb-button--sm"
              type="button"
              onClick={onSwitchToLogin}
            >
              Proceed to Login →
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bb-alert bb-alert--error" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label className="bb-field">
            <span className="bb-field__label">Email Address</span>
            <input
              className="bb-field__input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="bb-field">
            <span className="bb-field__label">Password</span>
            <input
              className="bb-field__input"
              type="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            className="bb-button bb-button--primary"
            type="submit"
            disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </div>
      </form>

      <p style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--bb-muted)' }}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          style={{
            border: 'none',
            background: 'none',
            color: 'var(--bb-primary)',
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Log in
        </button>
      </p>
    </div>
  );
}

export default Signup;
