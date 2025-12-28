import { ERROR_DEFINITIONS } from '@/constants/clientErrorDefinitions'
import { CLIENT_ERROR_TYPES } from '@/constants/clientErrorTypes'
import {
  ApiErrorPayload,
  ApiErrorResponse,
  ClientErrorType,
} from '@/types/api/apiErrors'
import axios, { AxiosError, AxiosResponse } from 'axios'

const ROUTER_URL = process.env.NEXT_PUBLIC_BACKEND_URL

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
  type: ClientErrorType
  status: number
  payload?: ApiErrorPayload

  constructor({
    message,
    status = 500,
    type = CLIENT_ERROR_TYPES.NETWORK_ERROR,
    payload,
  }: {
    type: ClientErrorType
    message: string
    status?: number
    payload?: ApiErrorPayload
  }) {
    super(message)
    this.status = status
    this.type = type
    this.payload = payload
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
      type: this.type,
      payload: this.payload,
    }
  }
}

const onError = (
  error: AxiosError<ApiErrorResponse>,
): Promise<ApiErrorResponse> => {
  const res = error.response

  if (res?.data) {
    const serverError = res.data as ApiErrorResponse

    const uiMessage = ERROR_DEFINITIONS[serverError.type].defaultMessage

    return Promise.reject(
      new ClientApiError({
        ...serverError,
        message: uiMessage,
      }),
    )
  }

  return Promise.reject(
    new ClientApiError({
      message: error.message || '네트워크 에러',
      status: 500,
      type: CLIENT_ERROR_TYPES.NETWORK_ERROR,
    }),
  )
}

services.interceptors.response.use(onResponse, onError)
