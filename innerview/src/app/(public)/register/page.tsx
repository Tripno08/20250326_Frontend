"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextField, Button, Paper, Typography, Box, Alert, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { CargoUsuario } from '@/types';

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: '',
    cargo: CargoUsuario.PROFESSOR,
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validação básica
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulando o registro para fins de demonstração
      // Em produção, isso seria uma chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular sucesso
      router.push('/login?registered=true');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
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
          maxWidth: 500,
          width: '100%',
          my: 4
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Innerview
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center" color="primary">
          Criar Conta
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome Completo"
            name="nome"
            fullWidth
            margin="normal"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="cargo-label">Cargo</InputLabel>
            <Select
              labelId="cargo-label"
              name="cargo"
              value={formData.cargo}
              label="Cargo"
              onChange={handleSelectChange}
            >
              <MenuItem value={CargoUsuario.PROFESSOR}>Professor</MenuItem>
              <MenuItem value={CargoUsuario.COORDENADOR}>Coordenador</MenuItem>
              <MenuItem value={CargoUsuario.ESPECIALISTA}>Especialista</MenuItem>
              <MenuItem value={CargoUsuario.DIRETOR}>Diretor</MenuItem>
              <MenuItem value={CargoUsuario.PSICOLOGO}>Psicólogo</MenuItem>
              <MenuItem value={CargoUsuario.ORIENTADOR}>Orientador</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Senha"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Confirmar Senha"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleInputChange}
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
            {isLoading ? 'Registrando...' : 'Registrar'}
          </Button>
          <Box textAlign="center">
            <Link href="/login" passHref>
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
                Já tem uma conta? Entrar
              </Typography>
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
} 