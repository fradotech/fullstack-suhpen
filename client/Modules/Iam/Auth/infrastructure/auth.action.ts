import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  AuthLoginRequest,
  AuthPasswordChangeRequest,
  AuthPasswordSendRequest,
  AuthRegisterRequest,
} from '@server/modules/iam/auth/infrastructure/auth.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { notification } from 'antd'
import { Path } from '../../../../common/Path'
import { Util } from '../../../../common/utils/util'
import { API } from '../../../../infrastructure/api.service'

export class AuthAction {
  static loggedUser(): UserResponse {
    return (
      Util.isValidJSON(localStorage.getItem('user')) &&
      JSON.parse(localStorage.getItem('user') || null)
    )
  }

  static async login(req: AuthLoginRequest): Promise<UserResponse> {
    const res: IApiRes<UserResponse> = await API.post(Path.login, req)
    const user = res?.data
    user && localStorage.setItem('_accessToken', user?._accessToken)
    user && localStorage.setItem('user', JSON.stringify(user))
    return user
  }

  static async register(
    req: AuthRegisterRequest,
  ): Promise<IApiRes<UserResponse>> {
    return await API.post(Path.register, req)
  }

  static logout(): boolean {
    localStorage.removeItem('_accessToken')
    localStorage.removeItem('user')
    return true
  }

  static async passwordSend(req: AuthPasswordSendRequest): Promise<boolean> {
    const res: IApiRes<UserResponse> = await API.post(Path.passwordSend, req)
    const isSuccess = !!res?.data
    isSuccess &&
      notification.success({
        message: 'Success send link reset password to your email ' + req.email,
      })

    return isSuccess
  }

  static async password(token: string): Promise<boolean> {
    const endpoint = `${Path.password}/${token}`
    const res: IApiRes<UserResponse> = await API.get(endpoint)
    return !!res.data.token
  }

  static async passwordChange(
    req: AuthPasswordChangeRequest,
    token: string,
  ): Promise<boolean> {
    req.token = token
    const res: IApiRes<string> = await API.patch(Path.passwordChange, req)

    return !!res.data
  }
}
