export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta?: {
    totalCount?: number;
    page?: number;
    perPage?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  institution?: string;
} 