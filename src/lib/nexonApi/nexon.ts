import { SERVER_ERROR_TYPES } from '@/constants/errors/severErrorTypes'
import { ApiErrorPayload, SeverErrorType } from '@/types/error/apiErrors'
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

const NEXON_BASE_URL = process.env.NEXT_PUBLIC_URL
const MAPLE_API_KEY = process.env.NEXT_PUBLIC_MAPLEAPI_KEY

const NEXON_ERROR_TYPE_BY_CODE: Record<string, SeverErrorType> = {
  OPENAPI00001: SERVER_ERROR_TYPES.NEXON_SERVER,
  OPENAPI00002: SERVER_ERROR_TYPES.NEXON_PER_MISSION,
  OPENAPI00003: SERVER_ERROR_TYPES.NEXON_INVALID_IDENTIFIER,
  OPENAPI00004: SERVER_ERROR_TYPES.NEXON_INVALID_PARAMETER,
  OPENAPI00005: SERVER_ERROR_TYPES.NEXON_INVALID_API_KEY,
  OPENAPI00006: SERVER_ERROR_TYPES.NEXON_INVALID_PATH,
  OPENAPI00007: SERVER_ERROR_TYPES.NEXON_RATE_LIMIT,
  OPENAPI00009: SERVER_ERROR_TYPES.NEXON_DATA_PREPARING,
  OPENAPI00010: SERVER_ERROR_TYPES.NEXON_GAME_MAINTENANCE,
  OPENAPI00011: SERVER_ERROR_TYPES.NEXON_API_MAINTENANCE,
}
export class ApiError extends Error {
  type: SeverErrorType
  status: number
  payload?: ApiErrorPayload

  constructor({
    message,
    status = 500,
    type = SERVER_ERROR_TYPES.INTERNAL,
    payload,
  }: {
    type: SeverErrorType
    message: string
    status: number
    payload?: ApiErrorPayload
  }) {
    super(message)
    this.message = message
    this.status = status
    this.type = type
    this.payload = payload
  }

  toJSON() {
    return {
      message: this.message,
      type: this.type,
      status: this.status,
      payload: this.payload,
    }
  }
}

export const nexonClient = axios.create({
  baseURL: NEXON_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'x-nxopen-api-key': MAPLE_API_KEY,
  },
})

const onResponse = (res: AxiosResponse) => {
  const { method, url } = res.config
  const { status, statusText } = res
  if (statusText === 'OK') {
    console.log(
      `[API - RESPONSE] ${method?.toUpperCase()} ${url} | ${status} : ${statusText}`,
    )
  }

  return res
}

export const onError = (error: AxiosError | Error): Promise<ApiError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig
    const nexonError = (error.response?.data as any)?.error

    const name = nexonError?.name ?? 'UnknownError'
    const message = nexonError?.message ?? 'Unknown error'
    const status = error.response?.status ?? 400
    const mappedType =
      NEXON_ERROR_TYPE_BY_CODE[name] ?? 'SEVER_ERROR_TYPES.NEXON_API'

    console.log(
      `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | ${name} : ${message}`,
    )

    return Promise.reject(
      new ApiError({
        status,
        type: mappedType,
        message,
        payload: {
          name,
          method,
          url,
        },
      }),
    )
  }

  console.log(`🚨 [API] | Error ${error.message}`)

  return Promise.reject(
    new ApiError({
      message: error.message,
      status: 500,
      type: SERVER_ERROR_TYPES.UNKNOWN,
    }),
  )
}

// 리스폰스 인터셉터
nexonClient.interceptors.response.use(onResponse, onError)
