import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
// api 폴더 URL
export const getClientBase = () => process.env.NEXT_PUBLIC_BACKEND_URL

const client = axios.create({
  timeout: 5000,
  baseURL: getClientBase(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  if (config.headers === undefined) return config
  return config
}

const onResponse = (res: AxiosResponse): AxiosResponse => {
  // 응답을 받은 후 처리할 작업
  return res
}

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    if (error?.response) {
      const errorCode = error.response?.data?.name || ''

      switch (errorCode) {
        case 'OPENAPI00001':
          alert('서버 내부 오류')
          break
        case 'OPENAPI00002':
          alert('권한이 없는 경우')
          break
        case 'OPENAPI00003':
          alert('유효하지 않은 식별자')
          break
        case 'OPENAPI00004':
          alert('파라미터 누락 또는 유효하지 않음')
          break
        case 'OPENAPI00005':
          alert('유효하지 않은 API KEY')
          break
        case 'OPENAPI00006':
          alert('유효하지 않은 게임 또는 API PATH')
          break
        case 'OPENAPI00007':
          alert('API 호출량 초과')
          break
        case 'OPENAPI00009':
          alert('데이터 준비 중')
          break
        case 'OPENAPI00010':
          alert('게임 점검 중')
          break
        case 'OPENAPI00011':
          alert('API 점검 중')
          break
        default:
          alert('알 수 없는 에러가 발생했습니다.')
          break
      }
    }
  } else {
    console.log(`client-index.ts 🚨 [API] | Error ${error.message}`)
  }
  return Promise.reject(error)
}

client.interceptors.request.use(onRequest)

client.interceptors.response.use(onResponse, onError)

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await client.get(url, config)
  return response
}

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await client.post(url, data, config)

  return response
}

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await client.put(url, data, config)
  return response
}

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await client.patch(url, data, config)

  return response
}

export const Delete = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await client.delete(url, {
    ...config,
    data,
  })

  return response
}

export default client
