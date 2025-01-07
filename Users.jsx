import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './axiosConfig'; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        console.log('Fetched users:', response.data); // Log the fetched users
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (id) => {
    navigate(`/chat/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h2>Available Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="chat-item" onClick={() => handleUserClick(user._id)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
