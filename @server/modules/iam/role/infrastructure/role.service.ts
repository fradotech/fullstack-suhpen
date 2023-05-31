import { Injectable } from '@nestjs/common'
import { RoleEnum } from '@server/modules/iam/role/common/role.enum'
import { Exception } from '../../../../common/exceptions/index.exception'
import { IRole } from './role.interface'

const roles: IRole[] = [
  {
    id: '1',
    name: RoleEnum.SuperAdmin,
  },
  {
    id: '2',
    name: RoleEnum.Admin,
  },
  {
    id: '3',
    name: RoleEnum.User,
  },
]

@Injectable()
export class RoleService {
  async find(): Promise<IRole[]> {
    return roles
  }

  async findOne(name: string): Promise<IRole | undefined> {
    const data = roles.find((role) => role.name == name)
    if (!data) Exception.entityNotFound('name', name)
    return data
  }
}
