import { Injectable } from '@nestjs/common'
import { Exception } from '../../../../common/exceptions/index.exception'
import { ERole } from './role.enum'
import { IRole } from './role.interface'

const roles: IRole[] = [
  {
    id: '1',
    name: ERole.SuperAdmin,
  },
  {
    id: '2',
    name: ERole.Admin,
  },
  {
    id: '3',
    name: ERole.User,
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
