import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './frontend/ThemeContext';
import Login from './frontend/Login';
import Register from './frontend/Register';
import Users from './frontend/Users';
import Dashboard from './frontend/Dashboard';
import ChatList from './frontend/ChatList';
import Chat from './frontend/Chat';
import ChatLayout from './frontend/ChatLayout';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={500}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/users" element={<Users />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route element={<ChatLayout />}>
                <Route path="/chat-list" element={<ChatList />} />
                <Route path="/chat/:id" element={<Chat />} />
              </Route>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Router>
    </ThemeProvider>
  );
}

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} style={{ position: 'absolute', top: 10, right: 10 }}>
      Toggle Theme
    </button>
  );
};

export default App;
