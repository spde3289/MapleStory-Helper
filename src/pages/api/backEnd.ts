import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
export const getBackEndBase = () => process.env.NEXT_PUBLIC_URL;

const backend = axios.create({
  timeout: 3000,
  baseURL: getBackEndBase(),
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

backend.interceptors.request.use(
  function (config) {
    if (config.headers === undefined) return config;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

backend.interceptors.response.use(
  function (response) {
    // 응답을 받은 후 처리할 작업
    return response;
  },
  function (error) {
    // 응답 에러 처리
    return Promise.reject(error);
  }
);

interface CommonResponse<T> {
  data?: T;
}

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await backend.get(url, config);

  return response;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await backend.post(url, data, config);

  return response;
};

export const Put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await backend.put(url, data, config);
  return response;
};

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await backend.patch(url, data, config);

  return response;
};

export const Delete = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<CommonResponse<T>>> => {
  const response = await backend.delete(url, {
    ...config,
    data: data,
  });

  return response;
};

export default backend;
