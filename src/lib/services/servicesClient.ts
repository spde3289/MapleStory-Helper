import { ERROR_DEFINITIONS } from '@/constants/clientErrorDefinitions'
import { ErrorType } from '@/constants/severErrorTypes'
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
    'Content-Type': 'application/json',
  },
})

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res
}

export class ClientApiError extends Error {
  status: number
  type: ErrorType
  payload?: ClientErrorPayload
  uiMessage: string

  constructor({
    message,
    status = 500,
    type = ERROR_TYPES.INTERNAL,
    payload,
    uiMessage,
  }: {
    message: string
    status?: number
    type?: ErrorType
    payload?: ClientErrorPayload
    uiMessage: string
  }) {
    super(message)
    this.status = status
    this.type = type
    this.payload = payload
    this.uiMessage = uiMessage
  }
}

const getErrorMessage = (type: ErrorType) =>
  ERROR_DEFINITIONS[type].defaultMessage

const onError = (
  error: AxiosError<ApiErrorResponse>,
): Promise<ApiErrorResponse> => {
  const res = error.response

  if (res?.data) {
    const serverError = res.data as ApiErrorResponse

    const uiMessage = getErrorMessage(serverError.type)

    return Promise.reject({
      ...serverError,
      message: uiMessage,
    })
  }

  // 서버 응답조차 없을 때
  return Promise.reject({
    message: error.message || '네트워크 에러',
    status: 500,
    type: 'NetworkError',
  })
}

services.interceptors.response.use(onResponse, onError)
