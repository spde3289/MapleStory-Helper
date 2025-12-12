import { SEVER_ERROR_TYPES } from './severErrorTypes'

export const CLIENT_ERROR_TYPES = {
  // 서버 에러 타입들
  ...SEVER_ERROR_TYPES,

  // 클라이언트 common 에러
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNEXPECTED_CLIENT_ERROR: 'UNEXPECTED_CLIENT_ERROR',
} as const

// 서버 + 클라 전부 포함하는 확장 타입
export type ClientErrorType =
  (typeof CLIENT_ERROR_TYPES)[keyof typeof CLIENT_ERROR_TYPES]
