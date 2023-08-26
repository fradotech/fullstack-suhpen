import { Injectable } from '@nestjs/common'
import { PermissionService } from '../../permission/infrastructure/permission.service'
import { IIamRole } from '../infrastructure/role.interface'
import { RoleService } from '../infrastructure/role.service'
import { RoleCreateRequest, RoleUpdateRequest } from './role.request'

@Injectable()
export class RoleCrudApp {
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
  ) {}

  async find(): Promise<IIamRole[]> {
    return await this.roleService.find()
  }

  async create(req: RoleCreateRequest): Promise<IIamRole> {
    const data = RoleCreateRequest.dto(req)

    if (req.permissionIds) {
      data.permissions = await this.permissionService.findByInIds(
        req.permissionIds,
      )
    }

    return await this.roleService.save(data)
  }

  async findOneOrFail(id: string): Promise<IIamRole> {
    return await this.roleService.findOneRelationPermissions(id)
  }

  async update(id: string, req: RoleUpdateRequest): Promise<IIamRole> {
    const data = await this.roleService.findOneByOrFail({ id })
    const dataUpdate = RoleUpdateRequest.dto(data, req)

    if (req.permissionIds) {
      dataUpdate.permissions = await this.permissionService.findByInIds(
        req.permissionIds,
      )
    }

    return await this.roleService.save(dataUpdate)
  }

  async delete(id: string): Promise<IIamRole> {
    const data = await this.roleService.findOneByOrFail({ id })
    await this.roleService.delete(id)
    return data
  }
}
