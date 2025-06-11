import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

const ERROR_MESSAGES = {
  AUTH: '인증 에러가 발생했습니다.',
  FORBIDDEN: '권한 에러가 발생했습니다.',
  NOT_FOUND: '리소스를 찾을 수 없습니다.',
  SERVER: '서버 에러가 발생했습니다.',
  NETWORK: '서버로부터 응답이 없습니다.',
  UNKNOWN: '요청 처리 중 오류가 발생했습니다.',
} as const

// axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: API_URL + '/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    // TODO: 토스트 UI 적용
    if (error.response) {
      const { status } = error.response

      switch (status) {
        case 401:
          console.error(ERROR_MESSAGES.AUTH)
          break
        case 403:
          console.error(ERROR_MESSAGES.FORBIDDEN)
          break
        case 404:
          console.error(ERROR_MESSAGES.NOT_FOUND)
          break
        case 500:
          console.error(ERROR_MESSAGES.SERVER)
          break
        default:
          console.error(ERROR_MESSAGES.UNKNOWN)
      }
    } else if (error.request) {
      console.error(ERROR_MESSAGES.NETWORK)
    } else {
      console.error(ERROR_MESSAGES.UNKNOWN)
    }

    return Promise.reject(error)
  },
)
