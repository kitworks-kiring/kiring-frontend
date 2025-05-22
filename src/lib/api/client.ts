import { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axios'

export type ApiResponse<T = Record<string, unknown> | unknown[] | null> = {
  data: T
  rspStatus: {
    code: number
    message: string
  }
}

/**
 * Axios 요청 Promise를 받아 [data, error] 형태로 반환하도록 하는 헬퍼 함수
 *
 * @template T - 응답 데이터 타입
 * @param promise - Axios 요청 Promise
 * @returns [ApiResponse<T> | undefined, Error | null]
 */

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

/**
 * 공통 API 클라이언트 객체
 * 각 메서드는 axios 인스턴스를 사용하여 HTTP 요청을 보내고,
 * 응답을 [data, error] 튜플 형태로 반환
 *
 * - 성공 시: [ApiResponse<T>, null]
 * - 실패 시: [undefined, Error]
 *
 * 모든 메서드는 `axiosInstance`로 요청을 보내며,
 * 응답 타입은 `ApiResponse<T>`로 감싸져 반환됨
 *
 * @example
 * const [res, err] = await ApiClient.get<{ users: User[] }>('/api/users')
 * if (err) return console.error(err)
 * console.log(res?.data)
 */

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
