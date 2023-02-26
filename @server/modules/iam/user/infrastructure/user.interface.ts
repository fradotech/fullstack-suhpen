import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import dayjs from 'dayjs'
import { ERole } from '../../role/infrastructure/role.enum'

export interface IUser extends IBaseEntity {
  name: string
  email: string
  password: string
  role: ERole
  phoneNumber?: string
  avatar?: string
  address?: string
  otp?: number
  otpExpiredAt?: Date
  isVerified: boolean
  token?: string
  birthDate?: Date | dayjs.Dayjs
  startAt?: Date
  endAt?: Date
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]
  _accessToken?: string
}
