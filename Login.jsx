import React, { useState } from 'react';
import api from './axiosConfig'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      console.log('Login response:', response.data); 
      localStorage.setItem('user', JSON.stringify(response.data)); 
      navigate('/users'); 
    } catch (err) {
      console.error('Error during login:', err.response.data); 
      alert(err.response.data.error || 'Login failed'); 
    }
  };

  const handleRegisterNavigation = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button onClick={handleRegisterNavigation} style={{ background: 'none', color: 'blue', border: 'none', cursor: 'pointer', padding: 0 }}>Register here</button></p>
    </div>
  );
};

export default Login;
