export interface ApiErrorResponse {
  message: string
  status: number
  type: string
  payload?: Record<string, any>
}
