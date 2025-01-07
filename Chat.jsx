import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './axiosConfig';
import './Chat.css'; 

const Chat = () => {
  const { id } = useParams(); //recepient id idu
  const [recipientName, setRecipientName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchRecipientDetails = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setRecipientName(response.data.name);
      } catch (err) {
        console.error('Error fetching recipient details:', err);
      }
    };

    const fetchMessages = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        setUser(currentUser);
        try {
          const response = await api.get(`/messages/${currentUser._id}/${id}`);
          setMessages(response.data);
        } catch (err) {
          console.error('Error fetching messages:', err);
        }
      }
    };

    fetchRecipientDetails();
    fetchMessages();
  }, [id]);

  const handleSendMessage = async () => {
    if (!user) {
      alert('You need to be logged in to send messages.');
      return;
    }

    if (newMessage.trim()) {
      try {
        const response = await api.post('/messages', {
          sender: user._id, //logged in users credential
          recipient: id,
          text: newMessage
        });
        setMessages([...messages, response.data]);
        setNewMessage('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">Chat with {recipientName}</div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === user?._id ? 'self' : 'other'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
