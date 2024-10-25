import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
// 넥슨 베이스 URL
export const getBackEndBase = () => process.env.NEXT_PUBLIC_URL;
// 메이플 api 키
export const getMapleKey = () => process.env.NEXT_PUBLIC_MAPLEAPI_KEY;

const backend = axios.create({
  timeout: 3000,
  baseURL: getBackEndBase(),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "x-nxopen-api-key": getMapleKey(),
  },
});

// 리퀘스트 요청 인터셉터
backend.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const { method, url } = config;
    console.log(`[API - REQUEST] ${method?.toUpperCase()} ${url}`);
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

// 리스폰스 인터셉터
backend.interceptors.response.use(
  function (res: AxiosResponse) {
    const { method, url } = res.config;
    const { status, statusText } = res;
    if (statusText === "OK") {
      console.log(
        `[API - RESPONSE] ${method?.toUpperCase()} ${url} | ${status} : ${statusText}`
      );
    } else {
      console.log(
        `[API - ERROR] ${method?.toUpperCase()} ${url} | ${status} : ${statusText}`
      );
    }

    return res;
  },
  function (error: AxiosError | Error): Promise<AxiosError> {
    if (axios.isAxiosError(error)) {
      const { method, url } = error.config as InternalAxiosRequestConfig;
      if (error.response) {
        const { name, message } = error.response.data.error;
        console.log(
          `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | ${name} : ${message}`
        );
      }
    } else {
      console.log(`🚨 [API] | Error ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export const isAxiosError = <ResponseDataType>(
  error: unknown
): error is AxiosError<ResponseDataType> => {
  return axios.isAxiosError(error);
};

interface CommonResponse<T> {
  data: T;
}

// get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await backend.get(url, config);
  return response;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await backend.post(url, data, config);

  return response;
};

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await backend.put(url, data, config);
  return response;
};

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await backend.patch(url, data, config);

  return response;
};

export const Delete = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await backend.delete(url, {
    ...config,
    data: data,
  });

  return response;
};

export default backend;
