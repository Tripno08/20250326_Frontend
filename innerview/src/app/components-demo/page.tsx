"use client";

import React, { useState } from 'react';
import { Container, Typography, Paper, Stack } from '@mui/material';
import Form from '@/components/ui/Form';
import FormField from '@/components/ui/FormField';
import DateField from '@/components/ui/DateField';
import MultiSelectField from '@/components/ui/MultiSelectField';
import FileUploadField from '@/components/ui/FileUploadField';
import dayjs, { Dayjs } from 'dayjs';

export default function ComponentesDemo() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    tipo: '',
    ativo: false,
  });
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [data, setData] = useState<Dayjs | null>(dayjs());
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    // Simulando uma submissão com atraso
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess('Formulário enviado com sucesso!');
      console.log({
        ...formData,
        habilidades,
        data: data?.format('DD/MM/YYYY'),
        arquivos: arquivos.map(f => f.name)
      });
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      email: '',
      tipo: '',
      ativo: false,
    });
    setHabilidades([]);
    setData(dayjs());
    setArquivos([]);
    setError('');
    setSuccess('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Demonstração de Componentes de Formulário
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Formulário de Cadastro - Exemplo
        </Typography>
        
        <Form
          onSubmit={handleFormSubmit}
          onReset={handleReset}
          isSubmitting={isSubmitting}
          error={error}
          successMessage={success}
          submitLabel="Enviar Formulário"
        >
          <Stack spacing={2}>
            <FormField
              type="text"
              textFieldProps={{
                label: "Nome",
                name: "nome",
                value: formData.nome,
                onChange: (e) => setFormData({ ...formData, nome: e.target.value }),
                required: true,
                fullWidth: true,
              }}
            />
            
            <FormField
              type="email"
              textFieldProps={{
                label: "Email",
                name: "email",
                value: formData.email,
                onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                required: true,
                fullWidth: true,
              }}
            />
            
            <FormField
              type="select"
              name="tipo"
              label="Tipo de Usuário"
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              options={[
                { value: 'admin', label: 'Administrador' },
                { value: 'coordenador', label: 'Coordenador' },
                { value: 'professor', label: 'Professor' },
                { value: 'especialista', label: 'Especialista' }
              ]}
              required
            />
            
            <FormField
              type="checkbox"
              name="ativo"
              label="Usuário Ativo"
              checked={formData.ativo}
              onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
            />
            
            <DateField
              name="dataNascimento"
              label="Data de Nascimento"
              value={data}
              onChange={(newDate) => setData(newDate)}
              disableFuture
              format="DD/MM/YYYY"
              required
            />
            
            <MultiSelectField
              name="habilidades"
              label="Habilidades"
              value={habilidades}
              onChange={(e) => {
                const value = e.target.value;
                setHabilidades(typeof value === 'string' ? value.split(',') : value);
              }}
              options={[
                { value: 'leitura', label: 'Leitura' },
                { value: 'escrita', label: 'Escrita' },
                { value: 'matematica', label: 'Matemática' },
                { value: 'comportamento', label: 'Comportamento' },
                { value: 'atencao', label: 'Atenção' },
                { value: 'socioemocional', label: 'Socioemocional' }
              ]}
              maxSelections={4}
              helperText="Selecione até 4 habilidades"
            />
            
            <FileUploadField
              name="documentos"
              label="Documentos"
              value={arquivos}
              onChange={setArquivos}
              accept=".pdf,.docx,.jpg,.png"
              multiple
              maxFiles={3}
              helperText="Documentos de comprovação (máx. 3 arquivos)"
            />
          </Stack>
        </Form>
      </Paper>
      
      <Typography variant="body2" color="text.secondary" align="center">
        Todos os componentes seguem as diretrizes de acessibilidade WCAG 2.2 AA
      </Typography>
    </Container>
  );
} 