import { ApiError } from '@/lib/nexonApi/nexonClient'

export type ApiErrorPayload = Record<string, unknown>

export type ApiErrorResponse = ReturnType<ApiError['toJSON']>
