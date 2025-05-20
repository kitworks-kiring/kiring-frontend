import { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axios'

const ApiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await axiosInstance.get<T>(url, config)
    return response.data
  },

  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    const response = await axiosInstance.post<T>(url, data, config)
    return response.data
  },

  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    const response = await axiosInstance.put<T>(url, data, config)
    return response.data
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await axiosInstance.delete<T>(url, config)
    return response.data
  },

  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    const response = await axiosInstance.patch<T>(url, data, config)
    return response.data
  },
}

export default ApiClient
