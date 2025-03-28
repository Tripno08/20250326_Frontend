"use client";

import React from 'react';
import { 
  Typography, 
  Box, 
  Paper,
  Card, 
  CardContent, 
  Divider 
} from '@mui/material';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Book as BookIcon,
} from '@mui/icons-material';

export default function DashboardPage() {
  const { user } = useAuth({ requireAuth: true });

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Bem-vindo, {user?.nome || 'Usuário'}! Aqui está um resumo das atividades de monitoramento e intervenção.
        </Typography>
      </Box>

      {/* Filtros serão implementados aqui */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Filtros serão implementados posteriormente
        </Typography>
      </Paper>

      {/* Cards de Métricas */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3, 
        mb: 4,
        '& > *': { 
          flex: {
            xs: '0 0 100%',
            sm: '0 0 calc(50% - 12px)',
            md: '0 0 calc(25% - 18px)'
          } 
        }
      }}>
        <MetricCard
          title="Estudantes"
          value={248}
          subtitle="Estudantes ativos"
          icon={<PeopleIcon fontSize="large" />}
          trend={+12}
        />
        
        <MetricCard
          title="Intervenções"
          value={42}
          subtitle="Intervenções ativas"
          icon={<AssignmentIcon fontSize="large" />}
          trend={+5}
        />
        
        <MetricCard
          title="Avaliações"
          value={15}
          subtitle="Avaliações pendentes"
          icon={<BookIcon fontSize="large" />}
          trend={-3}
        />
        
        <MetricCard
          title="Taxa de Resposta"
          value={74}
          subtitle="Percentual médio"
          icon={<TrendingUpIcon fontSize="large" />}
          trend={+8}
          isPercentage
        />
      </Box>

      {/* Seção 2 rows */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Distribuição RTI */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Distribuição RTI/MTSS</Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '200px', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
                <Box 
                  sx={{ 
                    height: '70%', 
                    width: '100%', 
                    backgroundColor: 'success.light',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    borderRadius: 1,
                  }}
                >
                  180
                </Box>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>Tier 1</Typography>
                <Typography variant="body2" color="text.secondary">72%</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
                <Box 
                  sx={{ 
                    height: '40%', 
                    width: '100%', 
                    backgroundColor: 'warning.light',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    borderRadius: 1,
                  }}
                >
                  45
                </Box>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>Tier 2</Typography>
                <Typography variant="body2" color="text.secondary">18%</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%' }}>
                <Box 
                  sx={{ 
                    height: '20%', 
                    width: '100%', 
                    backgroundColor: 'error.light',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    borderRadius: 1,
                  }}
                >
                  23
                </Box>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>Tier 3</Typography>
                <Typography variant="body2" color="text.secondary">10%</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Próximas Atividades */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Próximas Atividades</Typography>
            
            <Box sx={{ mb: 2, p: 1.5, borderLeft: '4px solid', borderColor: 'primary.main', pl: 2, bgcolor: 'background.paper' }}>
              <Typography variant="subtitle1" fontWeight="medium">Reunião de Equipe</Typography>
              <Typography variant="body2" color="text.secondary">Hoje, 14:00 - Sala de Conferências</Typography>
              <Typography variant="body2" mt={1}>Discussão do progresso dos estudantes do 3º ano</Typography>
            </Box>
            
            <Box sx={{ mb: 2, p: 1.5, borderLeft: '4px solid', borderColor: 'warning.main', pl: 2, bgcolor: 'background.paper' }}>
              <Typography variant="subtitle1" fontWeight="medium">Avaliação de Leitura</Typography>
              <Typography variant="body2" color="text.secondary">Amanhã, 10:30 - Sala 05</Typography>
              <Typography variant="body2" mt={1}>5 estudantes agendados para avaliação de fluência</Typography>
            </Box>
            
            <Box sx={{ mb: 2, p: 1.5, borderLeft: '4px solid', borderColor: 'success.main', pl: 2, bgcolor: 'background.paper' }}>
              <Typography variant="subtitle1" fontWeight="medium">Revisão de Intervenção</Typography>
              <Typography variant="body2" color="text.secondary">Quinta-feira, 15:00 - Online</Typography>
              <Typography variant="body2" mt={1}>Análise dos resultados do programa de intervenção em matemática</Typography>
            </Box>
          </Paper>
        </Box>

        {/* Estudantes que Precisam de Atenção */}
        <Box sx={{ width: '100%', mt: 2 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Estudantes que Precisam de Atenção</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2,
              '& > *': { 
                flex: {
                  xs: '0 0 100%',
                  sm: '0 0 calc(50% - 8px)',
                  md: '0 0 calc(25% - 12px)'
                } 
              }
            }}>
              {[
                { nome: 'João Silva', serie: '3º ano', nivel: 'Tier 3', area: 'Leitura', tendencia: 'descendente' },
                { nome: 'Maria Oliveira', serie: '2º ano', nivel: 'Tier 2', area: 'Matemática', tendencia: 'estável' },
                { nome: 'Carlos Santos', serie: '5º ano', nivel: 'Tier 3', area: 'Comportamento', tendencia: 'descendente' },
                { nome: 'Ana Pereira', serie: '1º ano', nivel: 'Tier 2', area: 'Escrita', tendencia: 'ascendente' }
              ].map((estudante, index) => (
                <Card variant="outlined" key={index}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">{estudante.nome}</Typography>
                    <Typography variant="body2" color="text.secondary">{estudante.serie}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, justifyContent: 'space-between' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: estudante.nivel === 'Tier 3' ? 'error.main' : 'warning.main',
                          fontWeight: 'medium'
                        }}
                      >
                        {estudante.nivel}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {estudante.area}
                      </Typography>
                      {estudante.tendencia === 'descendente' ? (
                        <TrendingDownIcon color="error" fontSize="small" />
                      ) : estudante.tendencia === 'ascendente' ? (
                        <TrendingUpIcon color="success" fontSize="small" />
                      ) : null}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

// Componente para os cards de métricas
interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  trend: number;
  isPercentage?: boolean;
}

function MetricCard({ title, value, subtitle, icon, trend, isPercentage = false }: MetricCardProps) {
  return (
    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 0.5 }}>{title}</Typography>
          <Typography variant="h4" color="primary" sx={{ mb: 0.5 }}>
            {value}{isPercentage ? '%' : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        </Box>
        <Box sx={{ color: 'primary.main' }}>
          {icon}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        {trend > 0 ? (
          <TrendingUpIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
        ) : (
          <TrendingDownIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />
        )}
        <Typography 
          variant="body2" 
          color={trend > 0 ? 'success.main' : 'error.main'}
        >
          {trend > 0 ? '+' : ''}{trend}{isPercentage ? '%' : ''}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
          vs período anterior
        </Typography>
      </Box>
    </Paper>
  );
} 