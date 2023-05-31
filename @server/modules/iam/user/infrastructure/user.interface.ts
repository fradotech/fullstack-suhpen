import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { RoleEnum } from '@server/modules/iam/role/common/role.enum'
import { UserGenderEnum } from '@server/modules/iam/user/common/user.enum'
import dayjs from 'dayjs'

export interface IUser extends IBaseEntity {
  name: string
  email: string
  password: string
  role: RoleEnum
  gender?: UserGenderEnum
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
