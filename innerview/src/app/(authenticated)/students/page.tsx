"use client";

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  TextField,
  Button,
  Divider,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Download as ExportIcon
} from '@mui/icons-material';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface Student {
  id: string;
  nome: string;
  serie: string;
  dataNascimento: string;
  instituicao?: string;
  dificuldades?: string[];
  status?: string;
}

export default function StudentsPage() {
  const { user } = useAuth({ requireAuth: true });
  const router = useRouter();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Efeito para carregar os estudantes da API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/v1/students?page=${page + 1}&perPage=${rowsPerPage}&search=${searchTerm}`);
        const result = await response.json();
        
        if (result.success) {
          setStudents(result.data);
          setFilteredStudents(result.data);
          setTotalCount(result.meta?.totalCount || 0);
        } else {
          console.error('Erro ao buscar estudantes:', result.error);
        }
      } catch (error) {
        console.error('Erro ao buscar estudantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, rowsPerPage, searchTerm]);

  // Manipuladores de eventos
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleAddStudent = () => {
    router.push('/students/new');
  };

  const handleEditStudent = (id: string) => {
    router.push(`/students/${id}/edit`);
  };

  const handleViewStudent = (id: string) => {
    router.push(`/students/${id}`);
  };

  const handleDeleteStudent = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este estudante?')) {
      try {
        const response = await fetch(`/api/v1/students/${id}`, {
          method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Atualizar a lista após exclusão
          setStudents(students.filter(student => student.id !== id));
          setFilteredStudents(filteredStudents.filter(student => student.id !== id));
          setTotalCount(prev => prev - 1);
        } else {
          console.error('Erro ao excluir estudante:', result.error);
        }
      } catch (error) {
        console.error('Erro ao excluir estudante:', error);
      }
    }
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

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Estudantes
        </Typography>
        
        <Box>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddStudent}
          >
            Novo Estudante
          </Button>
        </Box>
      </Box>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Buscar estudantes"
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            value={searchTerm}
            onChange={handleSearch}
            sx={{ mr: 2 }}
          />
          
          <IconButton color="primary" sx={{ ml: 1 }}>
            <FilterIcon />
          </IconButton>
          
          <IconButton color="primary" sx={{ ml: 1 }}>
            <ExportIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Série</TableCell>
                    <TableCell>Data de Nascimento</TableCell>
                    <TableCell>Idade</TableCell>
                    <TableCell>Dificuldades</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} hover>
                        <TableCell>{student.nome}</TableCell>
                        <TableCell>{student.serie}</TableCell>
                        <TableCell>{formatDate(student.dataNascimento)}</TableCell>
                        <TableCell>{calculateAge(student.dataNascimento)} anos</TableCell>
                        <TableCell>
                          {student.dificuldades && student.dificuldades.length > 0 ? (
                            student.dificuldades.map((dif, idx) => (
                              <Chip 
                                key={idx} 
                                label={dif} 
                                size="small" 
                                variant="outlined" 
                                color="primary"
                                sx={{ mr: 0.5, mb: 0.5 }} 
                              />
                            ))
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Nenhuma dificuldade registrada
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Visualizar">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleViewStudent(student.id)}
                            >
                              <ViewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="Editar">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => handleEditStudent(student.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="Excluir">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography variant="body1" sx={{ py: 2 }}>
                          Nenhum estudante encontrado
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
              labelRowsPerPage="Linhas por página:"
            />
          </>
        )}
      </Paper>
    </>
  );
} 