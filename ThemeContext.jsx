import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      root.style.setProperty('--background-color', 'var(--background-dark)');
      root.style.setProperty('--text-color', 'var(--text-dark)');
      root.style.setProperty('--text-background-color', 'var(--text-background-dark)');
      root.style.setProperty('--chat-background-color', 'var(--chat-background-dark)');
    } else {
      root.style.setProperty('--background-color', 'var(--background-light)');
      root.style.setProperty('--text-color', 'var(--text-light)');
      root.style.setProperty('--text-background-color', 'var(--text-background-light)');
      root.style.setProperty('--chat-background-color', 'var(--chat-background-light)');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
