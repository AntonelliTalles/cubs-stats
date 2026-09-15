import { create, AxiosError } from 'axios'

import { ApiError } from '@/types/api.types'

// Placeholder — replace with the real MLB Stats API base URL when integrating
const BASE_URL = 'https://statsapi.mlb.com/api/v1'

export const api = create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      status: error.response?.status ?? 0,
      message: error.message,
      code: error.code ?? 'UNKNOWN_ERROR',
    }
    return Promise.reject(apiError)
  },
)
