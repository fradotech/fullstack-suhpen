import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import dayjs from 'dayjs'
import { ERole } from '../../role/infrastructure/role.enum'
import { EUserGender } from './user.enum'

export interface IUser extends IBaseEntity {
  name: string
  email: string
  password: string
  role: ERole
  gender?: EUserGender
  phoneNumber?: string
  address?: string
  birthDate?: Date | dayjs.Dayjs
  avatar?: string
  otp?: number
  otpExpiredAt?: Date
  isVerified: boolean
  token?: string
  startAt?: Date
  endAt?: Date
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]
  _accessToken?: string
}
