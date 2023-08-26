import { Injectable } from '@nestjs/common'
import { IIamPermission } from '../infrastructure/permission.interface'
import { PermissionService } from '../infrastructure/permission.service'
import {
  PermissionCreateRequest,
  PermissionUpdateRequest,
} from './permission.request'

@Injectable()
export class PermissionCrudApp {
  constructor(private readonly permissionService: PermissionService) {}

  async find(): Promise<IIamPermission[]> {
    return await this.permissionService.find()
  }

  async create(req: PermissionCreateRequest): Promise<IIamPermission> {
    const data = PermissionCreateRequest.dto(req)
    return await this.permissionService.save(data)
  }

  async findOneOrFail(id: string): Promise<IIamPermission> {
    return await this.permissionService.findOneByOrFail({ id })
  }

  async update(
    id: string,
    req: PermissionUpdateRequest,
  ): Promise<IIamPermission> {
    const data = await this.permissionService.findOneByOrFail({ id })
    const dataUpdate = PermissionUpdateRequest.dto(data, req)
    return await this.permissionService.save(dataUpdate)
  }

  async delete(id: string): Promise<IIamPermission> {
    const data = await this.permissionService.findOneByOrFail({ id })
    await this.permissionService.delete(id)
    return data
  }
}
