import dayjs from 'dayjs'
import { IUser } from '../infrastructure/user.interface'
import { EntUser } from './user.entity'

export class UserResponse extends EntUser {
  otpExpiredAt?: Date
  _accessToken?: string
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]
  roleIds?: string[]

  static dto(data: IUser): UserResponse {
    const res = new UserResponse()
    Object.assign(res, data)

    delete res.password
    delete res.token

    res._accessToken = data.token
    res.roleIds = data.roles?.map((data) => data.id)

    return res
  }

  static dtos(data: IUser[]): UserResponse[] {
    return data.map((data) => this.dto(data))
  }
}

export class UserStrictResponse extends UserResponse {
  otpExpiredAt?: Date
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]

  static dto(data: IUser): UserStrictResponse {
    const res = new UserStrictResponse()
    Object.assign(res, data)

    delete res.password
    delete res.token
    delete res._accessToken

    res.roleIds = data.roles?.map((data) => data.id)

    return res
  }

  static dtos(data: IUser[]): UserStrictResponse[] {
    return data.map((data) => this.dto(data))
  }
}
