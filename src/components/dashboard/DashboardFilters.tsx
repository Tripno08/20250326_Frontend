"use client";

import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Grid, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Chip,
  IconButton,
  Drawer,
  useMediaQuery,
  Divider,
  SelectChangeEvent
} from '@mui/material';
import { 
  FilterList as FilterListIcon, 
  Close as CloseIcon,
  CalendarMonth as CalendarIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Search as SearchIcon, 
  SaveAlt as SaveIcon,
  RestartAlt as ResetIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import DateField from '@/components/ui/DateField';

interface FilterOption {
  id: string;
  label: string;
}

// Opções simuladas para os filtros
const PERIODOS: FilterOption[] = [
  { id: 'today', label: 'Hoje' },
  { id: 'yesterday', label: 'Ontem' },
  { id: 'last7days', label: 'Últimos 7 dias' },
  { id: 'last30days', label: 'Últimos 30 dias' },
  { id: 'thisMonth', label: 'Este mês' },
  { id: 'lastMonth', label: 'Mês passado' },
  { id: 'custom', label: 'Personalizado' }
];

const INSTITUICOES: FilterOption[] = [
  { id: 'todas', label: 'Todas as Instituições' },
  { id: '1', label: 'Escola Municipal João da Silva' },
  { id: '2', label: 'Colégio Estadual Maria Oliveira' },
  { id: '3', label: 'Instituto Educacional Futuro' }
];

const SERIES: FilterOption[] = [
  { id: 'todas', label: 'Todas as Séries' },
  { id: '1', label: '1º ano - Ensino Fundamental' },
  { id: '2', label: '2º ano - Ensino Fundamental' },
  { id: '3', label: '3º ano - Ensino Fundamental' },
  { id: '4', label: '4º ano - Ensino Fundamental' },
  { id: '5', label: '5º ano - Ensino Fundamental' }
];

const NIVEIS_RTI: FilterOption[] = [
  { id: 'todos', label: 'Todos os Níveis' },
  { id: 'tier1', label: 'Tier 1' },
  { id: 'tier2', label: 'Tier 2' },
  { id: 'tier3', label: 'Tier 3' }
];

export interface DashboardFiltersState {
  periodoPreset: string;
  dataInicio: Dayjs | null;
  dataFim: Dayjs | null;
  instituicaoId: string;
  serieId: string;
  nivelRti: string;
  filtrosAtivos: string[];
}

interface DashboardFiltersProps {
  filters: DashboardFiltersState;
  onFilterChange: (filters: DashboardFiltersState) => void;
  onApplyFilters: () => void;
}

export const DashboardFilters = ({ 
  filters, 
  onFilterChange, 
  onApplyFilters 
}: DashboardFiltersProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Mantém uma cópia local dos filtros para aplicar apenas quando o usuário confirmar
  const [localFilters, setLocalFilters] = useState<DashboardFiltersState>(filters);
  
  // Calcula os filtros ativos para exibição
  const getActiveFilters = (): string[] => {
    const active: string[] = [];
    
    // Período
    if (localFilters.periodoPreset && localFilters.periodoPreset !== 'last30days') {
      const periodo = PERIODOS.find(p => p.id === localFilters.periodoPreset);
      if (periodo) active.push(`Período: ${periodo.label}`);
    } else if (localFilters.periodoPreset === 'custom' && localFilters.dataInicio && localFilters.dataFim) {
      active.push(`Período: ${localFilters.dataInicio.format('DD/MM/YYYY')} a ${localFilters.dataFim.format('DD/MM/YYYY')}`);
    }
    
    // Instituição
    if (localFilters.instituicaoId && localFilters.instituicaoId !== 'todas') {
      const instituicao = INSTITUICOES.find(i => i.id === localFilters.instituicaoId);
      if (instituicao) active.push(`Instituição: ${instituicao.label}`);
    }
    
    // Série
    if (localFilters.serieId && localFilters.serieId !== 'todas') {
      const serie = SERIES.find(s => s.id === localFilters.serieId);
      if (serie) active.push(`Série: ${serie.label}`);
    }
    
    // Nível RTI
    if (localFilters.nivelRti && localFilters.nivelRti !== 'todos') {
      const nivel = NIVEIS_RTI.find(n => n.id === localFilters.nivelRti);
      if (nivel) active.push(`Nível RTI: ${nivel.label}`);
    }
    
    return active;
  };
  
  // Manipuladores de eventos
  const handlePeriodoChange = (event: SelectChangeEvent) => {
    const periodoPreset = event.target.value;
    
    // Atualizar datas com base no período selecionado
    let dataInicio = localFilters.dataInicio;
    let dataFim = localFilters.dataFim;
    
    switch(periodoPreset) {
      case 'today':
        dataInicio = dataFim = dayjs();
        break;
      case 'yesterday':
        dataInicio = dataFim = dayjs().subtract(1, 'day');
        break;
      case 'last7days':
        dataInicio = dayjs().subtract(6, 'day');
        dataFim = dayjs();
        break;
      case 'last30days':
        dataInicio = dayjs().subtract(29, 'day');
        dataFim = dayjs();
        break;
      case 'thisMonth':
        dataInicio = dayjs().startOf('month');
        dataFim = dayjs().endOf('month');
        break;
      case 'lastMonth':
        dataInicio = dayjs().subtract(1, 'month').startOf('month');
        dataFim = dayjs().subtract(1, 'month').endOf('month');
        break;
    }
    
    setLocalFilters({
      ...localFilters,
      periodoPreset,
      dataInicio,
      dataFim
    });
  };
  
  const handleDateChange = (field: 'dataInicio' | 'dataFim', date: Dayjs | null) => {
    setLocalFilters({
      ...localFilters,
      [field]: date
    });
  };
  
  const handleSelectChange = (event: SelectChangeEvent, field: string) => {
    setLocalFilters({
      ...localFilters,
      [field]: event.target.value
    });
  };
  
  const handleApplyFilters = () => {
    onFilterChange({
      ...localFilters,
      filtrosAtivos: getActiveFilters()
    });
    onApplyFilters();
    if (isMobile) {
      setDrawerOpen(false);
    }
  };
  
  const handleResetFilters = () => {
    const defaultFilters: DashboardFiltersState = {
      periodoPreset: 'last30days',
      dataInicio: dayjs().subtract(29, 'day'),
      dataFim: dayjs(),
      instituicaoId: 'todas',
      serieId: 'todas',
      nivelRti: 'todos',
      filtrosAtivos: []
    };
    
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
    onApplyFilters();
  };
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const filterContent = (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filtros</Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        {/* Filtro de Período */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
            Período
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="periodo-label">Selecione o período</InputLabel>
            <Select
              labelId="periodo-label"
              value={localFilters.periodoPreset}
              label="Selecione o período"
              onChange={handlePeriodoChange}
            >
              {PERIODOS.map(periodo => (
                <MenuItem key={periodo.id} value={periodo.id}>
                  {periodo.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {localFilters.periodoPreset === 'custom' && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DateField
                  name="dataInicio"
                  label="Data Inicial"
                  value={localFilters.dataInicio}
                  onChange={(date) => handleDateChange('dataInicio', date)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateField
                  name="dataFim"
                  label="Data Final"
                  value={localFilters.dataFim}
                  onChange={(date) => handleDateChange('dataFim', date)}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        
        {/* Filtro de Instituição */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <SchoolIcon fontSize="small" sx={{ mr: 1 }} />
            Instituição
          </Typography>
          
          <FormControl fullWidth>
            <InputLabel id="instituicao-label">Selecione a instituição</InputLabel>
            <Select
              labelId="instituicao-label"
              value={localFilters.instituicaoId}
              label="Selecione a instituição"
              onChange={(e) => handleSelectChange(e, 'instituicaoId')}
            >
              {INSTITUICOES.map(instituicao => (
                <MenuItem key={instituicao.id} value={instituicao.id}>
                  {instituicao.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        {/* Filtro de Série */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <GroupIcon fontSize="small" sx={{ mr: 1 }} />
            Série
          </Typography>
          
          <FormControl fullWidth>
            <InputLabel id="serie-label">Selecione a série</InputLabel>
            <Select
              labelId="serie-label"
              value={localFilters.serieId}
              label="Selecione a série"
              onChange={(e) => handleSelectChange(e, 'serieId')}
            >
              {SERIES.map(serie => (
                <MenuItem key={serie.id} value={serie.id}>
                  {serie.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        {/* Filtro de Nível RTI */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
            Nível RTI
          </Typography>
          
          <FormControl fullWidth>
            <InputLabel id="nivel-rti-label">Nível RTI</InputLabel>
            <Select
              labelId="nivel-rti-label"
              value={localFilters.nivelRti}
              label="Nível RTI"
              onChange={(e) => handleSelectChange(e, 'nivelRti')}
            >
              {NIVEIS_RTI.map(nivel => (
                <MenuItem key={nivel.id} value={nivel.id}>
                  {nivel.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="outlined" 
          color="inherit" 
          startIcon={<ResetIcon />}
          onClick={handleResetFilters}
        >
          Limpar
        </Button>
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<SearchIcon />}
          onClick={handleApplyFilters}
        >
          Aplicar Filtros
        </Button>
      </Box>
    </Box>
  );
  
  return (
    <>
      {/* Barra de filtros (visível em desktop) */}
      {!isMobile && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Filtros Ativos */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              {filters.filtrosAtivos.length > 0 ? (
                filters.filtrosAtivos.map((filtro, index) => (
                  <Chip
                    key={index}
                    label={filtro}
                    color="primary"
                    variant="outlined"
                    sx={{ fontSize: '0.85rem' }}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Sem filtros ativos
                </Typography>
              )}
            </Box>
            
            {/* Botões de Ação */}
            <Box>
              <Button
                size="small"
                startIcon={<FilterListIcon />}
                onClick={toggleDrawer}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Filtros
              </Button>
              
              <Button
                size="small"
                startIcon={<SaveIcon />}
                variant="outlined"
                color="secondary"
              >
                Salvar Visualização
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
      
      {/* Botão de Filtro Móvel */}
      {isMobile && (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawer}
            startIcon={<FilterListIcon />}
          >
            Filtros
            {filters.filtrosAtivos.length > 0 && (
              <Box 
                sx={{ 
                  ml: 1, 
                  bgcolor: 'background.paper', 
                  color: 'primary.main', 
                  width: 20, 
                  height: 20, 
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '0.8rem'
                }}
              >
                {filters.filtrosAtivos.length}
              </Box>
            )}
          </Button>
        </Box>
      )}
      
      {/* Drawer de Filtros */}
      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 400,
            height: isMobile ? 'auto' : '100%',
            maxHeight: isMobile ? '90%' : '100%',
            borderTopLeftRadius: isMobile ? 16 : 0,
            borderTopRightRadius: isMobile ? 16 : 0,
          }
        }}
      >
        {filterContent}
      </Drawer>
    </>
  );
};

export default DashboardFilters; 