import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { notification } from 'antd'
import axios, { AxiosError } from 'axios'

const hostLocal = 'http://localhost:3000'
const hostOnline = 'https://fradotech.up.railway.app'

export const HOST = location.href.includes('localhost') ? hostLocal : hostOnline
export const HOST_API = HOST + '/api/v1'

const headers = {
  Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
}

const notificationError = (e: AxiosError<IApiExportRes<unknown>>) => {
  if (e.response?.statusText === 'Unauthorized') {
    localStorage.removeItem('_accessToken')
    localStorage.removeItem('user')
    location.reload()
  }

  return notification.error({ message: e.response?.data?.message || String(e) })
}

export const API = {
  get: async (endpoint: string, params?: any): Promise<any> => {
    try {
      const { data } = await axios.get(`${HOST_API}${endpoint}`, {
        headers,
        params,
      })

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  post: async (
    endpoint: string,
    dataPost?: Record<string, any>,
    params?: any,
  ): Promise<any> => {
    try {
      const { data } = await axios.post(`${HOST_API}${endpoint}`, dataPost, {
        headers,
        params,
      })

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  put: async (endpoint: string, dataPost?: any): Promise<any> => {
    try {
      const { data } = await axios.put(`${HOST_API}${endpoint}`, dataPost, {
        headers,
      })

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  patch: async (endpoint: string, dataPost?: any): Promise<any> => {
    try {
      const { data } = await axios.patch(`${HOST_API}${endpoint}`, dataPost, {
        headers,
      })

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  delete: async (endpoint: string): Promise<any> => {
    try {
      const { data } = await axios.delete(`${HOST_API}${endpoint}`, {
        headers,
      })

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  catch: (res: any): void => {
    !res.data && notification.error({ message: res.response.data.message })
  },
}
