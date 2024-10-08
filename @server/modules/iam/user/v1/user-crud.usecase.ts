import { Injectable } from '@nestjs/common'
import { IBaseCrudUsecase } from '@server/infrastructure/base/base-crud-app.interface'
import { Exactly } from '@server/infrastructure/base/base.util'
import { RoleService } from '../../role/infrastructure/role.service'
import { IUser } from '../infrastructure/user.interface'
import { UserService } from '../infrastructure/user.service'
import { UserCreateRequest, UserUpdateRequest } from './user.request'

@Injectable()
export class UserCrudUsecase
  implements Exactly<IBaseCrudUsecase, UserCrudUsecase>
{
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async find(): Promise<IUser[]> {
    return await this.userService.find()
  }

  async create(req: UserCreateRequest): Promise<IUser> {
    const data = UserCreateRequest.dto(req)

    if (req.roleIds) {
      data.roles = await this.roleService.findByInIds(req.roleIds)
    }

    return await this.userService.save(data)
  }

  async findOneOrFail(id: string): Promise<IUser> {
    return await this.userService.findOneOrFailRelationRoles(id)
  }

  async update(id: string, req: UserUpdateRequest): Promise<IUser> {
    const data = await this.userService.findOneByOrFail({ id })
    const dataUpdate = UserUpdateRequest.dto(data, req)

    if (req.roleIds) {
      dataUpdate.roles = await this.roleService.findByInIds(req.roleIds)
    }

    return await this.userService.save(dataUpdate)
  }

  async delete(id: string): Promise<IUser> {
    const data = await this.userService.findOneByOrFail({ id })
    await this.userService.delete(id)
    return data
  }
}
