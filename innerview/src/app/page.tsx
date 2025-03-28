"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Paper,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Image from 'next/image';
import { 
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  School as SchoolIcon,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
  Groups as TeamsIcon
} from '@mui/icons-material';
import { useAuthStore } from '@/store/slices/authSlice';

export default function WelcomePage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  useEffect(() => {
    // Se já estiver autenticado, redirecionar para o dashboard
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);
  
  const features = [
    { 
      icon: <SchoolIcon fontSize="large" />, 
      title: 'Gestão de Estudantes', 
      description: 'Acompanhe o progresso individual de cada estudante com perfis detalhados e documentação completa.'
    },
    { 
      icon: <AnalyticsIcon fontSize="large" />, 
      title: 'RTI/MTSS', 
      description: 'Implementação completa dos níveis de suporte, classificação e planejamento de intervenções.'
    },
    { 
      icon: <AssessmentIcon fontSize="large" />, 
      title: 'Avaliações e Rastreios', 
      description: 'Ferramentas de avaliação e acompanhamento para identificação precoce de necessidades.'
    },
    { 
      icon: <TeamsIcon fontSize="large" />, 
      title: 'Colaboração em Equipe', 
      description: 'Trabalhe em conjunto com outros educadores para oferecer o melhor suporte possível.'
    }
  ];
  
  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        py: 4
      }}
    >
      {/* Header */}
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 8,
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
            <Image
              src="/logo.png"
              alt="Innerview Logo"
              width={40}
              height={40}
            />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                ml: 1,
                fontWeight: 700,
                background: 'linear-gradient(90deg, #1976d2 0%, #5e35b1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Innerview
            </Typography>
          </Box>
          <Box>
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mr: 2 }}
              onClick={() => router.push('/login')}
            >
              Entrar
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => router.push('/register')}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
        
        {/* Hero Section */}
        <Box sx={{ mb: 10 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                component="h2"
                fontWeight="bold"
                gutterBottom
              >
                Plataforma completa para gestão RTI/MTSS
              </Typography>
              <Typography 
                variant="h6" 
                component="h3"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Otimize o suporte educacional com nossa solução integrada para monitoramento, intervenção e avaliação.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  size="large"
                  startIcon={<LoginIcon />}
                  onClick={() => router.push('/login')}
                  fullWidth={isMobile}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Começar Agora
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  size="large"
                  startIcon={<RegisterIcon />}
                  onClick={() => router.push('/register')}
                  fullWidth={isMobile}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Criar Conta
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={6} 
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  height: { xs: 300, md: 400 },
                  position: 'relative'
                }}
              >
                <Image
                  src="/hero-image.jpg"
                  alt="Plataforma Innerview"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* Features Section */}
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          Recursos Principais
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box 
                  sx={{ 
                    color: 'primary.main', 
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  align="center" 
                  gutterBottom
                  fontWeight="bold"
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        {/* CTA Section */}
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #1976d2 0%, #5e35b1 100%)',
            color: 'white',
            mb: 6
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                Pronto para transformar o suporte educacional?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Comece hoje mesmo e melhore os resultados dos seus estudantes com nossa plataforma RTI/MTSS.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                fullWidth={isMobile}
                onClick={() => router.push('/register')}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  }
                }}
              >
                Criar Sua Conta Agora
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Footer */}
        <Box sx={{ pt: 4, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Innerview. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
