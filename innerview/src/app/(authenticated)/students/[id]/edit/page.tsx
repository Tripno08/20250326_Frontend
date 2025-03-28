"use client";

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Button,
  Divider,
  Alert,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter, useParams } from 'next/navigation';
import DateField from '@/components/ui/DateField';
import dayjs, { Dayjs } from 'dayjs';

interface StudentFormData {
  nome: string;
  serie: string;
  dataNascimento: Dayjs | null;
  instituicaoId?: string;
}

interface Institution {
  id: string;
  nome: string;
}

interface FormErrors {
  nome?: string;
  serie?: string;
  dataNascimento?: string;
}

export default function EditStudentPage() {
  const { id } = useParams();
  const router = useRouter();
  // Usar autenticação para proteção da rota
  useAuth({ requireAuth: true });
  const isNew = id === 'new';

  const [formData, setFormData] = useState<StudentFormData>({
    nome: '',
    serie: '',
    dataNascimento: null,
  });
  
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Carregar dados do estudante para edição
  useEffect(() => {
    const fetchStudentData = async () => {
      if (isNew) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/v1/students/${id}`);
        const result = await response.json();
        
        if (result.success) {
          const student = result.data;
          setFormData({
            nome: student.nome,
            serie: student.serie,
            dataNascimento: student.dataNascimento ? dayjs(student.dataNascimento) : null,
            instituicaoId: student.instituicaoId,
          });
        } else {
          setApiError(result.error?.message || 'Erro ao carregar dados do estudante');
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        setApiError(`Erro de conexão ao carregar dados do estudante: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    // Carregar lista de instituições
    const fetchInstitutions = async () => {
      try {
        const response = await fetch('/api/v1/institutions');
        const result = await response.json();
        
        if (result.success) {
          setInstitutions(result.data);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.error('Erro ao carregar instituições:', errorMessage);
      }
    };

    fetchInstitutions();
    if (!isNew) {
      fetchStudentData();
    }
  }, [id, isNew]);

  // Manipular mudanças no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo ao editar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo ao editar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData(prev => ({ ...prev, dataNascimento: date }));
    
    // Limpar erro do campo ao editar
    if (errors.dataNascimento) {
      setErrors(prev => ({ ...prev, dataNascimento: undefined }));
    }
  };

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.serie.trim()) {
      newErrors.serie = 'Série é obrigatória';
    }
    
    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Salvar estudante
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSaving(true);
      setApiError(null);
      setSuccessMessage(null);
      
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? '/api/v1/students' : `/api/v1/students/${id}`;
      
      // Preparar dados para envio
      const studentData = {
        ...formData,
        dataNascimento: formData.dataNascimento?.toISOString(),
      };
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage(isNew ? 'Estudante criado com sucesso!' : 'Estudante atualizado com sucesso!');
        
        // Redirecionar após salvar
        setTimeout(() => {
          if (isNew) {
            router.push(`/students/${result.data.id}`);
          } else {
            router.push(`/students/${id}`);
          }
        }, 1500);
      } else {
        setApiError(result.error?.message || 'Erro ao salvar estudante');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setApiError(`Erro de conexão ao salvar estudante: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Mostrar loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={handleCancel}
          sx={{ mr: 2 }}
        >
          Voltar
        </Button>
        <Typography variant="h4" component="h1">
          {isNew ? 'Novo Estudante' : 'Editar Estudante'}
        </Typography>
      </Box>
      
      {apiError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {apiError}
        </Alert>
      )}
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>Informações Básicas</Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="nome"
                label="Nome do Estudante"
                fullWidth
                required
                value={formData.nome}
                onChange={handleInputChange}
                error={!!errors.nome}
                helperText={errors.nome}
                disabled={saving}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                name="serie"
                label="Série"
                fullWidth
                required
                value={formData.serie}
                onChange={handleInputChange}
                error={!!errors.serie}
                helperText={errors.serie}
                disabled={saving}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DateField
                name="dataNascimento"
                label="Data de Nascimento"
                value={formData.dataNascimento}
                onChange={handleDateChange}
                required
                error={!!errors.dataNascimento}
                helperText={errors.dataNascimento}
                disabled={saving}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="instituicao-label">Instituição</InputLabel>
                <Select
                  labelId="instituicao-label"
                  name="instituicaoId"
                  value={formData.instituicaoId || ''}
                  label="Instituição"
                  onChange={handleSelectChange}
                  disabled={saving}
                >
                  <MenuItem value="">
                    <em>Nenhuma</em>
                  </MenuItem>
                  {institutions.map((inst) => (
                    <MenuItem key={inst.id} value={inst.id}>
                      {inst.nome}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Opcional</FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      Salvando...
                    </>
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
} 