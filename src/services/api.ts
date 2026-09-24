import { create, AxiosError } from 'axios'

import { ApiError } from '@/types/api.types'

// Base URL for our own Sports API (never the MLB Stats API directly — the
// mobile app must not know about it). Configure via EXPO_PUBLIC_API_URL,
// see .env.example.
const BASE_URL = process.env.EXPO_PUBLIC_API_URL

if (!BASE_URL) {
  throw new Error(
    'EXPO_PUBLIC_API_URL is not set. Copy .env.example to .env and point it at the Sports API (e.g. its LAN address when testing on a physical device via Expo Go).',
  )
}

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
