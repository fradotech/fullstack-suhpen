import { Injectable } from '@nestjs/common'
import { IBaseCrudUsecase } from '@server/infrastructure/base/base-crud-app.interface'
import { Exactly } from '@server/infrastructure/base/base.util'
import { PermissionService } from '../../permission/infrastructure/permission.service'
import { IRole } from '../infrastructure/role.interface'
import { RoleService } from '../infrastructure/role.service'
import { RoleCreateRequest, RoleUpdateRequest } from './role.request'

@Injectable()
export class RoleCrudUsecase
  implements Exactly<IBaseCrudUsecase, RoleCrudUsecase>
{
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
  ) {}

  async find(): Promise<IRole[]> {
    return await this.roleService.find()
  }

  async create(req: RoleCreateRequest): Promise<IRole> {
    const data = RoleCreateRequest.dto(req)

    if (req.permissionIds) {
      data.permissions = await this.permissionService.findByInIds(
        req.permissionIds,
      )
    }

    return await this.roleService.save(data)
  }

  async findOneOrFail(id: string): Promise<IRole> {
    return await this.roleService.findOneRelationPermissions(id)
  }

  async update(id: string, req: RoleUpdateRequest): Promise<IRole> {
    const data = await this.roleService.findOneByOrFail({ id })
    const dataUpdate = RoleUpdateRequest.dto(data, req)

    if (req.permissionIds) {
      dataUpdate.permissions = await this.permissionService.findByInIds(
        req.permissionIds,
      )
    }

    return await this.roleService.save(dataUpdate)
  }

  async delete(id: string): Promise<IRole> {
    const data = await this.roleService.findOneByOrFail({ id })
    await this.roleService.delete(id)
    return data
  }
}
