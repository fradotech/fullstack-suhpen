import axios from 'axios'

const hostLocal = 'http://localhost:3000/api/v1'
const hostOnline = 'https://fradotech.up.railway.app/api/v1'

export const host = location.href.includes('localhost') ? hostLocal : hostOnline

export const axiosService = {
  get: async (endpoint: string, params?: any): Promise<any> => {
    try {
      const { data } = await axios.get(`${host}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
        params,
      })

      axiosService.catch(data)

      return data
    } catch (error) {
      alert(error.response.data.message)
      return error
    }
  },

  post: async (
    endpoint: string,
    dataPost?: Record<string, any>,
    isCatch?: boolean,
  ): Promise<any> => {
    try {
      const { data } = await axios.post(`${host}${endpoint}`, dataPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
      })

      axiosService.catch(data)

      return data
    } catch (error) {
      !isCatch && alert(error.response.data.message)
      return error
    }
  },

  put: async (
    endpoint: string,
    dataPost?: any,
    isCatch?: boolean,
  ): Promise<any> => {
    try {
      const { data } = await axios.put(`${host}${endpoint}`, dataPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
      })

      axiosService.catch(data)

      return data
    } catch (error) {
      !isCatch && alert(error.response.data.message)
      return error
    }
  },

  delete: async (endpoint: string): Promise<any> => {
    try {
      const { data } = await axios.delete(`${host}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
      })

      axiosService.catch(data)

      return data
    } catch (error) {
      alert(error.response.data.message)
      return error
    }
  },

  catch: (res: any): void => {
    !res.data && alert(res.response.data.message)
  },
}
