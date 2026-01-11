import { CLIENT_ERROR_TYPES } from '@/constants/errors/clientErrorTypes'
import { SERVER_ERROR_TYPES } from '@/constants/errors/severErrorTypes'
import { ApiError } from '@/lib/nexonApi/nexonClient'

export type ApiErrorPayload = Record<string, unknown>

// 서버 에러 타입
export type SeverErrorType =
  (typeof SERVER_ERROR_TYPES)[keyof typeof SERVER_ERROR_TYPES]

// 클라이언트 에러 타입
export type ClientErrorType =
  (typeof CLIENT_ERROR_TYPES)[keyof typeof CLIENT_ERROR_TYPES]

// 사버 에러 응답 타입
export type ApiErrorResponse = ReturnType<ApiError['toJSON']>
