import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
export const getClientBase = () => process.env.NEXT_PUBLIC_BACKEND_URL;

const client = axios.create({
  timeout: 3000,
  baseURL: getClientBase(),
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
  // if (axios.isAxiosError(error)) {
  //   const { method, url } = error.config as InternalAxiosRequestConfig;
  //   if (error.response) {
  //     const { statusCode, message } = error.response.data;
  //     console.log(
  //       `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | ${statusCode} : ${message}`
  //     );
  //   }
  // } else {
  //   console.log(`🚨 [API] | Error ${error.message}`);
  // }
  return Promise.reject(error);
};

client.interceptors.request.use(function (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  if (config.headers === undefined) return config;
  return config;
});

client.interceptors.response.use(function (res: AxiosResponse): AxiosResponse {
  // 응답을 받은 후 처리할 작업
  return res;
}, onError);

interface CommonResponse<T> {
  data: T;
}

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.get(url, config);
  return response.data;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.post(url, data, config);

  return response.data;
};

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.put(url, data, config);
  return response.data;
};

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.patch(url, data, config);

  return response.data;
};

export const Delete = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CommonResponse<T>> => {
  const response = await client.delete(url, {
    ...config,
    data: data,
  });

  return response.data;
};

export default client;
