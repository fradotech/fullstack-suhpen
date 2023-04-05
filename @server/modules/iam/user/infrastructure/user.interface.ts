import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { ERole } from 'client/Modules/Iam/Role/Role.enum'
import { EUserGender } from 'client/Modules/Iam/User/User.enum'
import dayjs from 'dayjs'

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
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]
  _accessToken?: string
}
