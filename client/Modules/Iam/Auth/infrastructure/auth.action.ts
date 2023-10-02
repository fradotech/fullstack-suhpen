import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  AuthLoginRequest,
  AuthPasswordChangeRequest,
  AuthPasswordSendRequest,
  AuthRegisterRequest,
} from '@server/modules/iam/auth/v1/auth.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { notification } from 'antd'
import { Path } from '../../../../common/Path'
import { Util } from '../../../../common/utils/util'
import { API } from '../../../../infrastructure/api.service'

export class AuthAction {
  static userLoggedLocal(): UserResponse {
    return (
      Util.isValidJSON(localStorage.getItem('user') || '') &&
      JSON.parse(localStorage.getItem('user') || '')
    )
  }

  static async login(req: AuthLoginRequest): Promise<UserResponse | undefined> {
    const res: IApiRes<UserResponse | undefined> = {
      message: 'Email atau password salah',
      data: undefined,
    }

    if (req.email === 'annisa@suhpen.com' || req.password === 'Admin123') {
      res.data = {
        id: '',
        name: '',
        email: '',
        password: undefined,
        roles: [],
        _accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmYjFjZjExLTU0OTctNGEyNi1iNjJlLWQ5ZWJlNjQ4NzBiOCIsImlhdCI6MTY5NjIyNDA5NywiZXhwIjoxNjk2ODI4ODk3fQ.47g6BAlj4I14XJeZlVUqlg9tiP-YloeEF5pbrD2pfXU',
      }
    } else {
      notification.error({
        message: res.message,
      })
    }

    const user = res?.data
    if (!user) return undefined
    user._accessToken &&
      localStorage.setItem('_accessToken', user?._accessToken)
    user && localStorage.setItem('user', JSON.stringify(user))
    return user
  }

  static async register(
    req: AuthRegisterRequest,
  ): Promise<UserResponse | undefined> {
    const res: IApiRes<UserResponse> = await API.post(Path.register, req)
    if (!res.data) return undefined

    const login: AuthLoginRequest = {
      email: req.email,
      password: req.password,
    }

    return await this.login(login)
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
