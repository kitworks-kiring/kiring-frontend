import { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axios'

export type ApiResponse<T = Record<string, unknown> | unknown[] | null> = {
  data: T
  rspStatus: {
    code: number
    message: string
  }
}

async function toResult<T>(
  promise: Promise<{ data: ApiResponse<T> }>,
): Promise<[ApiResponse<T> | undefined, Error | null]> {
  try {
    const { data } = await promise
    return [data, null]
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e))
    return [undefined, error]
  }
}

const ApiClient = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<[ApiResponse<T> | undefined, Error | null]> => {
    return toResult<T>(axiosInstance.get<ApiResponse<T>>(url, config))
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<[ApiResponse<T> | undefined, Error | null]> => {
    return toResult<T>(axiosInstance.post<ApiResponse<T>>(url, data, config))
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<[ApiResponse<T> | undefined, Error | null]> => {
    return toResult<T>(axiosInstance.put<ApiResponse<T>>(url, data, config))
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<[ApiResponse<T> | undefined, Error | null]> => {
    return toResult<T>(axiosInstance.delete<ApiResponse<T>>(url, config))
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<[ApiResponse<T> | undefined, Error | null]> => {
    return toResult<T>(axiosInstance.patch<ApiResponse<T>>(url, data, config))
  },
}

export default ApiClient
