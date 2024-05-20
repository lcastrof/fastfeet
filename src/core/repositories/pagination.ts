export interface PaginationParams {
  page: number;
  itemsPerPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}
