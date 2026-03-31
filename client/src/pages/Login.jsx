import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple demo: accept any non-empty username/password
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      if (onLogin) onLogin();
      // Redirect to where user wanted to go, or /manage-custom-items
      const from = location.state?.from?.pathname || '/manage-custom-items';
      navigate(from, { replace: true });
    } else {
      setError('Please enter username and password.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', background: '#222', color: 'white', borderRadius: 12, padding: 32, boxShadow: '0 2px 16px #0008' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login Required</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #555', background: '#181818', color: 'white', fontSize: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #555', background: '#181818', color: 'white', fontSize: '1rem' }}
        />
        {error && <div style={{ color: 'red', marginTop: 4 }}>{error}</div>}
        <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: 6, padding: '0.7rem 0', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
