import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
// api 폴더 URL
export const getClientBase = () => process.env.NEXT_PUBLIC_BACKEND_URL

const client = axios.create({
  timeout: 3000,
  baseURL: getClientBase(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    if (error?.response) {
      const name = error.response?.data?.name || '' // 기본값을 빈 문자열로 설정
      if (name === 'OPENAPI00004' || name === 'OPENAPI00003') {
        alert('일치하는 이름이 없습니다.')
      }
    }
  } else {
    console.log(`🚨 [API] | Error ${error.message}`)
  }
  return Promise.reject(error)
}

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (config.headers === undefined) return config
    return config
  },
)

client.interceptors.response.use((res: AxiosResponse): AxiosResponse => {
  // 응답을 받은 후 처리할 작업
  return res
}, onError)

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
