import { notification } from 'antd'
import axios from 'axios'

const hostLocal = 'http://localhost:3000'
const hostOnline = 'https://fradotech.up.railway.app'

export const host = location.href.includes('localhost') ? hostLocal : hostOnline
export const hostApi = host + '/api/v1'

export const axiosService = {
  get: async (endpoint: string, params?: any): Promise<any> => {
    try {
      const { data } = await axios.get(`${hostApi}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
        params,
      })

      axiosService.catch(data)

      return data
    } catch (error) {
      notification.error({ message: error.response.data.message })
      return error
    }
  },

  post: async (
    endpoint: string,
    dataPost?: Record<string, any>,
    isCatch?: boolean,
  ): Promise<any> => {
    try {
      const { data } = await axios.post(`${hostApi}${endpoint}`, dataPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
      })

      axiosService.catch(data)

      return data
    } catch (error) {
      !isCatch && notification.error({ message: error.response.data.message })
      return error
    }
  },

  put: async (
    endpoint: string,
    dataPost?: any,
    isCatch?: boolean,
  ): Promise<any> => {
    try {
      const { data } = await axios.put(`${hostApi}${endpoint}`, dataPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
      })

      axiosService.catch(data)

      return data
    } catch (error) {
      !isCatch && notification.error({ message: error.response.data.message })
      return error
    }
  },

  delete: async (endpoint: string): Promise<any> => {
    try {
      const { data } = await axios.delete(`${hostApi}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
      })

      axiosService.catch(data)

      return data
    } catch (error) {
      notification.error({ message: error.response.data.message })
      return error
    }
  },

  catch: (res: any): void => {
    !res.data && notification.error({ message: res.response.data.message })
  },
}
