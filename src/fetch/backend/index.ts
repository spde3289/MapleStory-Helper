import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
// 넥슨 베이스 URL
export const getBackEndBase = () => process.env.NEXT_PUBLIC_URL
// 메이플 api 키
export const getMapleKey = () => process.env.NEXT_PUBLIC_MAPLEAPI_KEY

const backend = axios.create({
  timeout: 5000,
  baseURL: getBackEndBase(),
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'x-nxopen-api-key': getMapleKey(),
  },
})

const onRequest = (config: InternalAxiosRequestConfig) => {
  const { method, url } = config
  console.log(`[API - REQUEST] ${method?.toUpperCase()} ${url}`)
  return config
}
;(error: any) => {
  return Promise.reject(error)
}

const onResponse = (res: AxiosResponse) => {
  const { method, url } = res.config
  const { status, statusText } = res
  if (statusText === 'OK') {
    console.log(
      `[API - RESPONSE] ${method?.toUpperCase()} ${url} | ${status} : ${statusText}`,
    )
  } else {
    console.log(
      `[API - ERROR] ${method?.toUpperCase()} ${url} | ${status} : ${statusText}`,
    )
  }

  return res
}

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig
    if (error.response) {
      const { name, message } = error.response.data.error
      console.log(
        `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | ${name} : ${message}`,
      )
    }
    return Promise.reject({
      status: error.response?.status || 400,
      statusText: error.response?.data.error.message,
      name: error.response?.data.error.name,
    })
  } else {
    console.log(`🚨 [API] | Error ${error.message}`)
  }
  return Promise.reject(error)
}

// 리퀘스트 요청 인터셉터
backend.interceptors.request.use(onRequest)

// 리스폰스 인터셉터
backend.interceptors.response.use(onResponse, onError)

export const isAxiosError = <ResponseDataType>(
  error: unknown,
): error is AxiosError<ResponseDataType> => {
  return axios.isAxiosError(error)
}

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.get(url, config)
  return response
}

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.post(url, data, config)

  return response
}

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.put(url, data, config)
  return response
}

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.patch(url, data, config)

  return response
}

export const Delete = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await backend.delete(url, {
    ...config,
    data,
  })

  return response
}

export default backend
