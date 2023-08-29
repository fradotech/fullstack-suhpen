import { Injectable } from '@nestjs/common'
import { IBaseCrudApp } from '@server/infrastructure/base/base-crud-app.interface'
import { Exactly } from '@server/infrastructure/base/base.util'
import { IPermission } from '../infrastructure/permission.interface'
import { PermissionService } from '../infrastructure/permission.service'
import {
  PermissionCreateRequest,
  PermissionUpdateRequest,
} from './permission.request'

@Injectable()
export class PermissionCrudApp
  implements Exactly<IBaseCrudApp, PermissionCrudApp>
{
  constructor(private readonly permissionService: PermissionService) {}

  async find(): Promise<IPermission[]> {
    return await this.permissionService.find()
  }

  async create(req: PermissionCreateRequest): Promise<IPermission> {
    const data = PermissionCreateRequest.dto(req)
    return await this.permissionService.save(data)
  }

  async findOneOrFail(id: string): Promise<IPermission> {
    return await this.permissionService.findOneByOrFail({ id })
  }

  async update(id: string, req: PermissionUpdateRequest): Promise<IPermission> {
    const data = await this.permissionService.findOneByOrFail({ id })
    const dataUpdate = PermissionUpdateRequest.dto(data, req)
    return await this.permissionService.save(dataUpdate)
  }

  async delete(id: string): Promise<IPermission> {
    const data = await this.permissionService.findOneByOrFail({ id })
    await this.permissionService.delete(id)
    return data
  }
}
