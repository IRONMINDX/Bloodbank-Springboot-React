import { useState } from 'react';
import { login } from '../api/authApi.js';
import '../components/bloodbank.css';

function Login({ onSubmit, onSwitchToSignup }) {
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
      const response = await login({ email: email.trim(), password });
      setSuccess('Login successful! Redirecting...');
      setPassword('');
      if (onSubmit) {
        onSubmit(response);
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bb-form" style={{ maxWidth: '420px', margin: '0 auto', width: '100%' }}>
      <div className="bb-form__header" style={{ marginBottom: '1rem' }}>
        <span className="bb-form__eyebrow">User Access</span>
        <h2 className="bb-form__title" style={{ fontSize: '1.6rem' }}>Sign In</h2>
        <p className="bb-form__subtitle" style={{ fontSize: '0.9rem' }}>
          Enter your registered email and password to access the portal.
        </p>
      </div>

      {success && (
        <div className="bb-alert bb-alert--success" role="status">
          {success}
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
              placeholder="Enter your password"
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>

      <p style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--bb-muted)' }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          style={{
            border: 'none',
            background: 'none',
            color: 'var(--bb-primary)',
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

export default Login;
