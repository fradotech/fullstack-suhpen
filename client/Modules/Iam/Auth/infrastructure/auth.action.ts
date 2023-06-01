import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  AuthLoginRequest,
  AuthPasswordChangeRequest,
  AuthPasswordSendRequest,
  AuthRegisterRequest,
} from '@server/modules/iam/auth/infrastructure/auth.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { notification } from 'antd'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../services/api.service'
import { Util } from '../../../../utils/util'

export const authAction = {
  loggedUser: (): UserResponse => {
    return (
      Util.isValidJSON(localStorage.getItem('user')) &&
      JSON.parse(localStorage.getItem('user') || null)
    )
  },

  login: async (req: AuthLoginRequest): Promise<UserResponse> => {
    const res: IApiRes<UserResponse> = await API.post(Route.login, req)
    const user = res?.data
    user && localStorage.setItem('_accessToken', user?._accessToken)
    user && localStorage.setItem('user', JSON.stringify(user))
    return user
  },

  register: async (
    req: AuthRegisterRequest,
  ): Promise<IApiRes<UserResponse>> => {
    return await API.post(Route.register, req)
  },

  logout: (): boolean => {
    localStorage.removeItem('_accessToken')
    localStorage.removeItem('user')
    return true
  },

  passwordSend: async (req: AuthPasswordSendRequest): Promise<boolean> => {
    const res: IApiRes<UserResponse> = await API.post(Route.passwordSend, req)
    const isSuccess = !!res?.data
    isSuccess &&
      notification.success({
        message: 'Success send link reset password to your email ' + req.email,
      })

    return isSuccess
  },

  password: async (token: string): Promise<boolean> => {
    const endpoint = `${Route.password}/${token}`
    const res: IApiRes<UserResponse> = await API.get(endpoint)
    return !!res.data.token
  },

  passwordChange: async (
    req: AuthPasswordChangeRequest,
    token: string,
  ): Promise<boolean> => {
    req.token = token
    const res: IApiRes<string> = await API.patch(Route.passwordChange, req)

    return !!res.data
  },
}
