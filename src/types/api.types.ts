export interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export interface PaginatedResponse<T> {
  data: T[]
  status: number
  message: string
  total: number
  page: number
  pageSize: number
}

export interface ApiError {
  status: number
  message: string
  code: string
}
