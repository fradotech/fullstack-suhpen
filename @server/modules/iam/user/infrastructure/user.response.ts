import dayjs from 'dayjs'
import { IUser } from '../infrastructure/user.interface'
import { EntUser } from './user.entity'

export class UserResponse extends EntUser {
  otpExpiredAt?: Date
  _accessToken?: string
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]

  static fromEntity(data: IUser): UserResponse {
    const res = new UserResponse()
    Object.assign(res, data)

    delete res.password
    delete res.token

    res._accessToken = data.token

    return res
  }

  static fromEntities(data: IUser[]): UserResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}

export class UserStrictResponse extends UserResponse {
  otpExpiredAt?: Date
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]

  static fromEntity(data: IUser): UserStrictResponse {
    const res = new UserStrictResponse()
    Object.assign(res, data)

    delete res.password
    delete res.token
    delete res._accessToken

    return res
  }

  static fromEntities(data: IUser[]): UserStrictResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}
