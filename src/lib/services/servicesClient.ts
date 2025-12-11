import { ApiErrorResponse } from '@/types/models/api/apiErrors'
import axios, { AxiosError, AxiosResponse } from 'axios'

const ROUTER_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const ROUTER_ENDPOINTS = {
  character: '/characters',
} as const

export const services = axios.create({
  timeout: 5000,
  baseURL: ROUTER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res
}

const onError = (error: AxiosError<ApiErrorResponse>) => {
  const res = error.response

  if (res?.data) {
    return Promise.reject(res.data as ApiErrorResponse)
  }

  // 서버 응답조차 없을 때
  return Promise.reject({
    message: error.message || '네트워크 에러',
    status: 500,
    type: 'NetworkError',
  } satisfies ApiErrorResponse)
}

services.interceptors.response.use(onResponse, onError)
