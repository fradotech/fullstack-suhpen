import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { UserGenderEnum } from '@server/modules/iam/user/common/user.enum'
import dayjs from 'dayjs'
import { IRole } from '../../role/infrastructure/role.interface'

export interface IUser extends IBaseEntity {
  name: string
  email: string
  password: string
  roles: IRole[]
  gender?: UserGenderEnum
  phoneNumber?: string
  address?: string
  birthDate?: Date | dayjs.Dayjs
  avatar?: string
  otp?: number
  otpExpiredAt?: Date
  isVerified?: boolean
  token?: string
  dateRange?: [dayjs.Dayjs, dayjs.Dayjs]
  _accessToken?: string
}
