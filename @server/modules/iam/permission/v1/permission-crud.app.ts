import { Injectable } from '@nestjs/common'
import { IPermission } from '../infrastructure/permission.interface'
import {
  PermissionCreateRequest,
  PermissionUpdateRequest,
} from '../infrastructure/permission.request'
import { PermissionService } from '../infrastructure/permission.service'

@Injectable()
export class PermissionCrudApp {
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
    await this.permissionService.delete(id)
    return await this.permissionService.findOneByOrFail({ id })
  }
}
