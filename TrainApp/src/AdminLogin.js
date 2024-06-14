// src/components/AdminLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ setAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setAuthenticated(true);
      navigate('/admin'); // Navegar a la interfaz de gestión de rutas
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input 
        type="text" 
        placeholder="Usuario" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default AdminLogin;
