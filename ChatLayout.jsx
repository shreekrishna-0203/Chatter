import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatList from './ChatList';
import './ChatLayout.css';

const ChatLayout = () => {
  return (
    <div className="chat-layout">
      <div className="chat-sidebar">
        <ChatList />
      </div>
      <div className="chat-main">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
