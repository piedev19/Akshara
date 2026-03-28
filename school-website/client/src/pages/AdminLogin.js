//client/src/pages/AdminLogin.js
import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/admin/login', { email, password });

      localStorage.setItem('adminToken', res.token);
      nav('/admin/admissions');
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>Admin Login</h2>

        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
            onClick={handleLogin}
            style={styles.button}
            onMouseEnter={e => Object.assign(e.target.style, styles.buttonHover)}
            onMouseLeave={e => {
                e.target.style.transform = 'none';
                e.target.style.boxShadow = 'none';
            }}
        >
            Login →
        </button>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: `radial-gradient(circle at 20% 20%, rgba(0,229,255,0.1), transparent),
                #070b14`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    position: 'relative'
 },

  card: {
    width: 340,
    padding: '40px 30px',
    borderRadius: 16,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    transition: '0.3s'
  },

  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 10,
    background: 'linear-gradient(135deg,#e8edf5,#94a3b8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  input: {
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.03)',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    transition: '0.2s'
  },

  button: {
    marginTop: 10,
    padding: '12px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    color: '#000',
    background: 'linear-gradient(135deg,#00e5ff,#7c3aed)',
    transition: '0.3s',
    },

    buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 30px rgba(0,229,255,0.3)'
    }
};