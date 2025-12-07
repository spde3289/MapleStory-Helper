import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

const NEXON_BASE_URL = process.env.NEXT_PUBLIC_URL
const MAPLE_API_KEY = process.env.NEXT_PUBLIC_MAPLEAPI_KEY

export const MAPLE_ENDPOINTS = {
  character: {
    ocid: '/v1/id', // 캐릭터 식별자(ocid) 조회

    list: '/v1/character/list', // 캐릭터 목록 조회
    basic: '/v1/character/basic', // 기본 정보
    stat: '/v1/character/stat', // 종합 능력치
  },
  user: {
    raider: '/v1/user/union-raider', // 유니온 공격대 정보 조회
  },
} as const

export const nexonClient = axios.create({
  baseURL: NEXON_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'x-nxopen-api-key': MAPLE_API_KEY,
  },
})

const onRequest = (config: InternalAxiosRequestConfig) => {
  const { method, url } = config
  console.log(`[API - REQUEST] ${method?.toUpperCase()} ${url}`)
  return config
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
    return Promise.reject(
      new Error(
        JSON.stringify({
          status: error.response?.status || 400,
          statusText: error.response?.data.error.message,
          name: error.response?.data.error.name,
        }),
      ),
    )
  }

  console.log(`🚨 [API] | Error ${error.message}`)

  return Promise.reject(error)
}

// 리퀘스트 요청 인터셉터
nexonClient.interceptors.request.use(onRequest)

// 리스폰스 인터셉터
nexonClient.interceptors.response.use(onResponse, onError)
