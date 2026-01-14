import { SERVER_ERROR_TYPES } from './severErrorTypes'

export const CLIENT_ERROR_TYPES = {
  // 서버 에러 타입들
  ...SERVER_ERROR_TYPES,

  // 클라이언트 common 에러
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNEXPECTED_CLIENT_ERROR: 'UNEXPECTED_CLIENT_ERROR',
} as const
