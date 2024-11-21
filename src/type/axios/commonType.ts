export interface ResponseDataType<T> {
  data?: T
  status: number
  statusText: string
  name?: string
}

export interface ResponseErrorDataType {
  statusText: string
  status: number
  name: string
}

export interface APIResponseErrorDataType {
  statusText: string
  status: number
  error: {
    name: string
    message: string
  }
}
