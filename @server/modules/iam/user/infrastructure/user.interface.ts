import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { UserGenderEnum } from '@server/modules/iam/user/common/user.enum'
import dayjs from 'dayjs'
import { IIamRole } from '../../role/infrastructure/role.interface'

export interface IIamUser extends IBaseEntity {
  name: string
  email: string
  password: string | undefined
  roles: IIamRole[]
  gender?: UserGenderEnum
  phoneNumber?: string
  address?: string
  birthDate?: Date | dayjs.Dayjs
  avatar?: string
  otp?: number
  otpExpiredAt?: Date
  isVerified?: boolean
  token?: string
  _accessToken?: string
}
