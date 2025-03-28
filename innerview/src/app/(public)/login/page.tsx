"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
import { useAuthStore } from '@/store/slices/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simulando autenticação para fins de demonstração
      // Em produção, isso seria uma chamada real à API
      if (email === 'admin@exemplo.com' && password === '123456') {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAuth(
          {
            id: '1',
            email: 'admin@exemplo.com',
            nome: 'Administrador',
            cargo: 'ADMIN',
            criadoEm: new Date(),
            atualizadoEm: new Date(),
          },
          'token-simulado'
        );
        
        router.push('/dashboard');
      } else {
        setError('Credenciais inválidas. Tente admin@exemplo.com / 123456');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Box 
      sx={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        padding: 2
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Innerview
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center" color="primary">
          Entrar
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </Button>
          <Box textAlign="center">
            <Link href="/register" passHref>
              <Typography 
                variant="body2"
                component="span"
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Não tem uma conta? Registre-se
              </Typography>
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
} 