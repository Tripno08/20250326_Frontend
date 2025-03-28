import { Student } from '@/types/domain/student';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    totalCount: number;
    page: number;
    perPage: number;
  };
}

interface StudentQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  serie?: string;
  status?: string;
}

export async function fetchStudents(params: StudentQueryParams = {}): Promise<ApiResponse<Student[]>> {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.perPage) queryParams.append('perPage', params.perPage.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.serie) queryParams.append('serie', params.serie);
  if (params.status) queryParams.append('status', params.status);
  
  const response = await fetch(`/api/v1/students?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching students: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchStudentById(id: string): Promise<ApiResponse<Student>> {
  const response = await fetch(`/api/v1/students/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching student: ${response.statusText}`);
  }
  
  return response.json();
}

export async function createStudent(data: Partial<Student>): Promise<ApiResponse<Student>> {
  const response = await fetch('/api/v1/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Error creating student: ${response.statusText}`);
  }
  
  return response.json();
}

export async function updateStudent(id: string, data: Partial<Student>): Promise<ApiResponse<Student>> {
  const response = await fetch(`/api/v1/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Error updating student: ${response.statusText}`);
  }
  
  return response.json();
}

export async function deleteStudent(id: string): Promise<ApiResponse<null>> {
  const response = await fetch(`/api/v1/students/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Error deleting student: ${response.statusText}`);
  }
  
  return response.json();
} 