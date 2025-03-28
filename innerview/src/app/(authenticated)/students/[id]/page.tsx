"use client";

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Button,
  Divider,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  School as SchoolIcon,
  CalendarMonth as CalendarIcon,
  House as HouseIcon,
  Flag as FlagIcon,
  BarChart as ChartIcon,
  Assignment as AssignmentIcon,
  Psychology as PsychologyIcon,
  Group as GroupIcon,
  Description as DocumentIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  UploadFile as UploadIcon
} from '@mui/icons-material';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter, useParams } from 'next/navigation';
import FileUploadField from '@/components/ui/FileUploadField';

// Tipos de cores do Material UI para chips
type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

interface StudentDetail {
  id: string;
  nome: string;
  serie: string;
  dataNascimento: string;
  instituicao?: string;
  dificuldades?: Array<{
    nome: string;
    nivel: string;
    categoria: string;
  }>;
  guardians?: Array<{
    name: string;
    relationship: string;
    email: string;
    phone: string;
  }>;
  intervencoes?: Array<{
    id: string;
    tipo: string;
    status: string;
    dataInicio: string;
    dataFim?: string;
  }>;
  avaliacoes?: Array<{
    id: string;
    tipo: string;
    data: string;
    pontuacao: number;
  }>;
  documentos?: Array<{
    id: string;
    nome: string;
    tipo: string;
    tamanho: number;
    dataUpload: string;
    url: string;
  }>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`student-tabpanel-${index}`}
      aria-labelledby={`student-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function StudentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  // Usar hooks de autenticação para proteção da rota
  useAuth({ requireAuth: true });
  
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Carregar dados do estudante
  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/v1/students/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setStudent(result.data);
        } else {
          setError(result.error?.message || 'Erro ao buscar dados do estudante');
        }
      } catch (error) {
        setError('Erro de conexão ao buscar dados do estudante');
        console.error('Erro ao buscar estudante:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudentDetail();
    }
  }, [id]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/students/${id}/edit`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const calculateAge = (dateString: string) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const getNivelColor = (nivel: string): ChipColor => {
    const levelMap: Record<string, ChipColor> = {
      'BAIXO': 'success',
      'MODERADO': 'warning',
      'ALTO': 'error',
      'MUITO_ALTO': 'error'
    };
    
    return levelMap[nivel] || 'default';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleUploadDocuments = async () => {
    if (files.length === 0) return;
    
    try {
      setUploading(true);
      setUploadSuccess(false);
      setUploadError(null);
      
      // Criar FormData para upload de arquivos
      const formData = new FormData();
      formData.append('studentId', id as string);
      files.forEach(file => {
        formData.append('files', file);
      });
      
      // Simular upload para o mock
      // Em produção, usaríamos uma API real para upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulação de sucesso
      setUploadSuccess(true);
      setFiles([]);
      
      // Atualizar a lista de documentos (simulação)
      if (student) {
        const newDocs = files.map((file, index) => ({
          id: `doc-${Date.now()}-${index}`,
          nome: file.name,
          tipo: file.type,
          tamanho: file.size,
          dataUpload: new Date().toISOString(),
          url: '#'
        }));
        
        setStudent({
          ...student,
          documentos: [
            ...(student.documentos || []),
            ...newDocs
          ]
        });
      }
    } catch (error) {
      setUploadError('Erro ao enviar documentos. Tente novamente.');
      console.error('Erro ao fazer upload:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este documento?')) {
      return;
    }
    
    try {
      // Simulação de requisição ao servidor
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Atualizar a lista de documentos
      if (student && student.documentos) {
        setStudent({
          ...student,
          documentos: student.documentos.filter(doc => doc.id !== docId)
        });
      }
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
    }
  };

  const handleDownloadDocument = (doc: { nome: string, url: string }) => {
    // Em um ambiente real, esta função redirecionaria para a URL do documento
    // ou faria o download por meio de uma API
    
    // Simulação de download para demonstração
    alert(`Baixando o documento: ${doc.nome}`);
  };

  // Exibir Loading
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Exibir Erro
  if (error) {
    return (
      <Box sx={{ mb: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={handleBack}
        >
          Voltar
        </Button>
      </Box>
    );
  }

  // Exibir estudante não encontrado
  if (!student) {
    return (
      <Box sx={{ mb: 3 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Estudante não encontrado
        </Alert>
        <Button
          variant="outlined"
          startIcon={<BackIcon />}
          onClick={handleBack}
        >
          Voltar
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<BackIcon />}
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            Voltar
          </Button>
          <Typography variant="h4" component="h1">
            Estudante: {student.nome}
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Editar
        </Button>
      </Box>
      
      {/* Informações Básicas */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center', sm: 'flex-start' },
          gap: 3
        }}>
          <Avatar
            sx={{ 
              width: 120, 
              height: 120, 
              bgcolor: 'primary.main',
              fontSize: '3rem'
            }}
          >
            {student.nome.charAt(0)}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SchoolIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">Série</Typography>
                </Box>
                <Typography variant="body1">{student.serie}</Typography>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">Data de Nascimento</Typography>
                </Box>
                <Typography variant="body1">
                  {formatDate(student.dataNascimento)} ({calculateAge(student.dataNascimento)} anos)
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <HouseIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">Instituição</Typography>
                </Box>
                <Typography variant="body1">
                  {student.instituicao || "Não informada"}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <FlagIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">Status</Typography>
                </Box>
                <Chip 
                  label="Ativo" 
                  color="success" 
                  size="small" 
                  variant="outlined" 
                />
              </Grid>
            </Grid>
            
            {/* Dificuldades de Aprendizagem */}
            {student.dificuldades && student.dificuldades.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Dificuldades de Aprendizagem</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {student.dificuldades.map((dif, idx) => (
                    <Chip 
                      key={idx} 
                      label={`${dif.nome} - ${dif.nivel}`} 
                      size="small" 
                      color={getNivelColor(dif.nivel)}
                      sx={{ mr: 0.5, mb: 0.5 }} 
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        
        {/* Abas para detalhes */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Responsáveis" icon={<GroupIcon />} iconPosition="start" />
            <Tab label="Intervenções" icon={<AssignmentIcon />} iconPosition="start" />
            <Tab label="Avaliações" icon={<ChartIcon />} iconPosition="start" />
            <Tab label="Documentos" icon={<DocumentIcon />} iconPosition="start" />
            <Tab label="Observações" icon={<PsychologyIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* Conteúdo das abas */}
        <TabPanel value={tabValue} index={0}>
          {student.guardians && student.guardians.length > 0 ? (
            <List>
              {student.guardians.map((guardian, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <Divider variant="inset" component="li" />}
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Avatar>{guardian.name.charAt(0)}</Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          component="span"
                          fontWeight="medium"
                        >
                          {guardian.name} - {guardian.relationship}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            display="block"
                          >
                            Email: {guardian.email}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Telefone: {guardian.phone}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhum responsável cadastrado para este estudante.
            </Typography>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {student.intervencoes && student.intervencoes.length > 0 ? (
            <Grid container spacing={2}>
              {student.intervencoes.map((intervencao, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {intervencao.tipo}
                      </Typography>
                      <Chip 
                        label={intervencao.status} 
                        color={intervencao.status === 'ATIVO' ? 'success' : 'default'} 
                        size="small" 
                        sx={{ mb: 2 }} 
                      />
                      <Typography variant="body2" color="text.secondary">
                        Início: {formatDate(intervencao.dataInicio)}
                      </Typography>
                      {intervencao.dataFim && (
                        <Typography variant="body2" color="text.secondary">
                          Fim: {formatDate(intervencao.dataFim)}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhuma intervenção registrada para este estudante.
            </Typography>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          {student.avaliacoes && student.avaliacoes.length > 0 ? (
            <Grid container spacing={2}>
              {student.avaliacoes.map((avaliacao, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {avaliacao.tipo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Data: {formatDate(avaliacao.data)}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        Pontuação: <strong>{avaliacao.pontuacao}</strong>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nenhuma avaliação registrada para este estudante.
            </Typography>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Documentos do Estudante
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <FileUploadField
                name="documentos"
                label="Adicionar Documentos"
                value={files}
                onChange={setFiles}
                accept=".pdf,.doc,.docx,.jpg,.png"
                multiple
                maxFiles={5}
                maxSize={10 * 1024 * 1024} // 10MB
                helperText="Documentos como laudos, avaliações externas, relatórios etc."
                disabled={uploading}
              />
              
              {files.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<UploadIcon />}
                    onClick={handleUploadDocuments}
                    disabled={uploading}
                  >
                    {uploading ? 'Enviando...' : 'Enviar Documentos'}
                  </Button>
                </Box>
              )}
              
              {uploadSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Documentos enviados com sucesso!
                </Alert>
              )}
              
              {uploadError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {uploadError}
                </Alert>
              )}
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Documentos Existentes
            </Typography>
            
            {student.documentos && student.documentos.length > 0 ? (
              <List>
                {student.documentos.map((doc) => (
                  <Paper 
                    key={doc.id} 
                    variant="outlined" 
                    sx={{ 
                      mb: 2, 
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DocumentIcon color="primary" sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle2">{doc.nome}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatFileSize(doc.tamanho)} • Enviado em {formatDate(doc.dataUpload)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box>
                      <Tooltip title="Baixar">
                        <IconButton 
                          color="primary"
                          onClick={() => handleDownloadDocument(doc)}
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Excluir">
                        <IconButton 
                          color="error"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Paper>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                Nenhum documento encontrado para este estudante.
              </Typography>
            )}
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}>
          <Typography variant="body2" color="text.secondary">
            Nenhuma observação registrada para este estudante.
          </Typography>
        </TabPanel>
      </Paper>
    </>
  );
} 