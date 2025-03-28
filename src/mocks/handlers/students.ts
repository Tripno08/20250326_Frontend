import { http, HttpResponse, delay } from 'msw';
import { createMockStudent, createMockStudents } from '../factories';
import { IMockApiResponse, IMockStudent } from '../types';

// Cache simulado de estudantes
let students: IMockStudent[] = createMockStudents(20);

export const studentHandlers = [
  // Listar estudantes
  http.get('/api/v1/students', async ({ request }) => {
    await delay();
    
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const perPage = Number(url.searchParams.get('perPage') || '10');
    const search = url.searchParams.get('search') || '';
    
    // Filtragem básica por nome
    let filteredStudents = students;
    if (search) {
      filteredStudents = students.filter(student => 
        student.nome.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Paginação
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedStudents = filteredStudents.slice(start, end);
    
    const response: IMockApiResponse<IMockStudent[]> = {
      success: true,
      data: paginatedStudents,
      meta: {
        totalCount: filteredStudents.length,
        page,
        perPage,
      },
    };
    
    return HttpResponse.json(response);
  }),
  
  // Obter estudante por ID
  http.get('/api/v1/students/:id', async ({ params }) => {
    await delay();
    
    const { id } = params;
    const student = students.find(s => s.id === id);
    
    if (!student) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: 'NOT_FOUND',
            message: 'Estudante não encontrado',
          },
        }),
        { status: 404 }
      );
    }
    
    const response: IMockApiResponse<IMockStudent> = {
      success: true,
      data: student,
    };
    
    return HttpResponse.json(response);
  }),
  
  // Criar estudante
  http.post('/api/v1/students', async ({ request }) => {
    await delay();
    
    const studentData = await request.json();
    
    // Validação básica
    if (!studentData.nome || !studentData.serie) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Dados incompletos',
            details: {
              fields: ['nome', 'serie'],
            },
          },
        }),
        { status: 422 }
      );
    }
    
    const newStudent = createMockStudent(studentData);
    students.push(newStudent);
    
    const response: IMockApiResponse<IMockStudent> = {
      success: true,
      data: newStudent,
    };
    
    return HttpResponse.json(response);
  }),
  
  // Atualizar estudante
  http.put('/api/v1/students/:id', async ({ params, request }) => {
    await delay();
    
    const { id } = params;
    const studentData = await request.json();
    
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: 'NOT_FOUND',
            message: 'Estudante não encontrado',
          },
        }),
        { status: 404 }
      );
    }
    
    // Atualizar estudante
    const updatedStudent = {
      ...students[index],
      ...studentData,
      atualizadoEm: new Date().toISOString(),
    };
    
    students[index] = updatedStudent;
    
    const response: IMockApiResponse<IMockStudent> = {
      success: true,
      data: updatedStudent,
    };
    
    return HttpResponse.json(response);
  }),
  
  // Excluir estudante
  http.delete('/api/v1/students/:id', async ({ params }) => {
    await delay();
    
    const { id } = params;
    
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          data: null,
          error: {
            code: 'NOT_FOUND',
            message: 'Estudante não encontrado',
          },
        }),
        { status: 404 }
      );
    }
    
    // Remover estudante do array
    students = students.filter(s => s.id !== id);
    
    return HttpResponse.json({
      success: true,
      data: null,
    });
  }),
]; 