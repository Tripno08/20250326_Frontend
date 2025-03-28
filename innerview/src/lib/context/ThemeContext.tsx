"use client";

import React, { createContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/styles/themes';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'light',
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  // Carregar preferência de tema do localStorage no carregamento inicial
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') as ThemeMode | null;
    if (savedTheme) {
      setThemeMode(savedTheme);
    } else {
      // Verificar se o usuário prefere tema escuro no navegador
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, []);

  // Salvar preferência de tema no localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Aplicar o tema adequado com base na preferência
  const theme = useMemo(() => {
    return themeMode === 'light' ? lightTheme : darkTheme;
  }, [themeMode]);

  const contextValue = useMemo(
    () => ({
      themeMode,
      toggleTheme,
      setThemeMode,
    }),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 