import { ApiErrorResponse } from '@/types/error/apiErrors'

export const splitSettled = <T>(results: PromiseSettledResult<T>[]) => {
  const success: T[] = []
  const errors: ApiErrorResponse[] = []

  for (const r of results) {
    if (r.status === 'fulfilled') {
      success.push(r.value)
    } else {
      errors.push(r.reason)
    }
  }

  return { success, errors }
}
