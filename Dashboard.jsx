import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={() => navigate('/chat-list')}>Chat List</button>
      <button onClick={() => navigate('/')}>Logout</button>
    </div>
  );
};

export default Dashboard;
