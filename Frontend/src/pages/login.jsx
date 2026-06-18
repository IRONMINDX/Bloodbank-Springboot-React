import { useState } from 'react';

function Login({ onSubmit, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    if (onSubmit) {
      onSubmit({ email, password });
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
      <p style={{ marginTop: '12px' }}>
        Don't have an account?{' '}
        <button type="button" onClick={onSwitchToSignup} style={{ border: 'none', background: 'none', color: '#bf1e2e', cursor: 'pointer', padding: 0 }}>
          Sign up
        </button>
      </p>
    </div>
  );
}

export default Login;
