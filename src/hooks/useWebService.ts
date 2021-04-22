import { axios } from '../boot/axios'
import { AxiosRequestConfig } from 'axios'

function useWebService () {
  async function get<T> (url: string, config?: AxiosRequestConfig) {
    const response = await axios.get(url, config)
    return response.data as T
  }

  async function post<T> (url: string, data: T, config?: AxiosRequestConfig) {
    const response = await axios.post(url, data, config)
    return response.data as T
  }

  async function put<T> (url: string, data: T, config?: AxiosRequestConfig) {
    const response = await axios.put(url, data, config)
    return response.data as T
  }

  async function del (url: string, config?: AxiosRequestConfig) {
    return await axios.delete(url, config)
  }

  return {
    get,
    post,
    put,
    del
  }
}

export default useWebService()
