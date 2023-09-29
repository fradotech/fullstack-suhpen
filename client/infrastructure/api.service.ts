import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { notification } from 'antd'
import axios, { AxiosError, AxiosHeaders, RawAxiosRequestHeaders } from 'axios'

export const HOST = `${process.env.HOST}`
export const HOST_API = HOST + process.env.APP_PREFIX

const headers: RawAxiosRequestHeaders | AxiosHeaders = {
  Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
  backofficeToken: process.env.BACKOFFICE_TOKEN,
}

const axiosInstance = axios.create({ headers })

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
      const { data } = await axiosInstance.get(`${HOST_API}${endpoint}`, {
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
      const { data } = await axiosInstance.post(
        `${HOST_API}${endpoint}`,
        dataPost,
        {
          params,
        },
      )

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  put: async (endpoint: string, dataPost?: any): Promise<any> => {
    try {
      const { data } = await axiosInstance.put(
        `${HOST_API}${endpoint}`,
        dataPost,
      )

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  patch: async (endpoint: string, dataPost?: any): Promise<any> => {
    try {
      const { data } = await axiosInstance.patch(
        `${HOST_API}${endpoint}`,
        dataPost,
      )

      API.catch(data)

      return data
    } catch (e: unknown) {
      notificationError(e as AxiosError<IApiExportRes<unknown>>)
      return e
    }
  },

  delete: async (endpoint: string | undefined): Promise<any> => {
    try {
      const { data } = await axiosInstance.delete(`${HOST_API}${endpoint}`)

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
