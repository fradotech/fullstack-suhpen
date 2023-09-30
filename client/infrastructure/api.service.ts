import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { notification } from 'antd'
import axios, { AxiosError, AxiosHeaders, RawAxiosRequestHeaders } from 'axios'

const hostLocal = 'http://localhost:3000'
const hostOnline = 'https://nest.fradotech.vercel.app'

export const HOST = location.href.includes('localhost')
  ? process.env.HOST || hostLocal
  : hostOnline

export const HOST_API = HOST + (process.env.APP_PREFIX || '/api/v1')

const headers: RawAxiosRequestHeaders | AxiosHeaders = {
  Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
  backofficeToken: process.env.BACKOFFICE_TOKEN,
}

const axiosInstance = axios.create({ baseURL: HOST_API, headers })

const notificationError = (e: AxiosError<IApiExportRes<unknown>>) => {
  if (e.response?.data?.message === 'Unauthorized') {
    localStorage.removeItem('_accessToken')
    localStorage.removeItem('user')
    location.reload()
  }

  return notification.error({ message: e.response?.data?.message || String(e) })
}

export const API = {
  get: async (endpoint: string, params?: any): Promise<any> => {
    try {
      const { data } = await axiosInstance.get(endpoint, {
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
      const { data } = await axiosInstance.post(endpoint, dataPost, {
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
      const { data } = await axiosInstance.put(endpoint, dataPost)

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  patch: async (endpoint: string, dataPost?: any): Promise<any> => {
    try {
      const { data } = await axiosInstance.patch(endpoint, dataPost)

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  delete: async (endpoint: string): Promise<any> => {
    try {
      const { data } = await axiosInstance.delete(endpoint)

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
