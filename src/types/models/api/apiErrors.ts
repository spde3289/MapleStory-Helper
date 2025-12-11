import { ApiError } from '@/lib/nexonApi/nexonClient'

export type ApiErrorResponse = ReturnType<ApiError['toJSON']>
