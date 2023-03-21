import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  AuthLoginRequest,
  AuthPasswordChangeRequest,
  AuthPasswordSendRequest,
  AuthRegisterRequest,
} from '@server/modules/iam/auth/infrastructure/auth.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { notification } from 'antd'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'

export const authAction = {
  loggedUser: (): UserResponse =>
    JSON.parse(localStorage.getItem('user') || 'null'),

  login: async (req: AuthLoginRequest): Promise<UserResponse> => {
    const res = await axiosService.post(Route.login, req)
    const user = res?.data
    localStorage.setItem('_accessToken', user._accessToken || '')
    localStorage.setItem('user', JSON.stringify(user))
    return user
  },

  register: async (
    req: AuthRegisterRequest,
  ): Promise<IApiRes<UserResponse>> => {
    return await axiosService.post(Route.register, req)
  },

  logout: (): boolean => {
    localStorage.removeItem('_accessToken')
    localStorage.removeItem('user')
    return true
  },

  passwordSend: async (req: AuthPasswordSendRequest): Promise<boolean> => {
    const res = await axiosService.post(Route.passwordSend, req)
    const isSuccess = !!res?.data
    isSuccess &&
      notification.success({
        message: 'Success send link reset password to your email ' + req.email,
      })

    return isSuccess
  },

  passwordChange: async (
    req: AuthPasswordChangeRequest,
    token: string,
  ): Promise<UserResponse> => {
    req.token = token
    return await axiosService.patch(Route.passwordChange, req)
  },
}
