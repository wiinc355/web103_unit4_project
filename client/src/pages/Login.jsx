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
    <div style={{ minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.25rem 1.25rem' }}>
      <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', background: 'rgba(20, 20, 20, 0.88)', color: 'white', borderRadius: 14, padding: 30, border: '1px solid #3a3a3a', boxShadow: '0 12px 32px rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 8, fontSize: '1.5rem', letterSpacing: 0.4 }}>Login Required</h2>
      <p style={{ textAlign: 'center', marginTop: 0, marginBottom: 18, color: '#cfcfcf', fontSize: '0.95rem' }}>Please sign in to manage custom items.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: 11, borderRadius: 8, border: '1px solid #4f4f4f', background: '#111', color: 'white', fontSize: '0.98rem', outline: 'none' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 11, borderRadius: 8, border: '1px solid #4f4f4f', background: '#111', color: 'white', fontSize: '0.98rem', outline: 'none' }}
        />
        {error && <div style={{ color: '#ff7f7f', marginTop: 2, fontSize: '0.92rem' }}>{error}</div>}
        <button type="submit" style={{ background: 'linear-gradient(135deg, #0d6efd, #0059d6)', color: 'white', border: 'none', borderRadius: 8, padding: '0.62rem 0.75rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 6px 16px rgba(13,110,253,0.35)', minHeight: 36 }}>Login</button>
        <p style={{ margin: '0 0 0 0', color: '#b9b9b9', fontSize: '0.84rem', lineHeight: 1.35, textAlign: 'left' }}>
          Instructions: Enter any non-empty username and password, then click Login. You will be redirected to the Manage Custom Items page. Leaving that page will automatically log you out.
        </p>
      </form>
      </div>
    </div>
  );
};

export default Login;
