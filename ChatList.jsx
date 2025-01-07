import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './axiosConfig'; 
import './ChatList.css';

const ChatList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="chat-list">
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

export default ChatList;
