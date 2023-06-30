import { Injectable } from '@nestjs/common'
import { IRole } from '../infrastructure/role.interface'
import {
  RoleCreateRequest,
  RoleUpdateRequest,
} from '../infrastructure/role.request'
import { RoleService } from '../infrastructure/role.service'

@Injectable()
export class RoleCrudApp {
  constructor(private readonly roleService: RoleService) {}

  async find(): Promise<IRole[]> {
    return await this.roleService.find()
  }

  async create(req: RoleCreateRequest): Promise<IRole> {
    const data = RoleCreateRequest.dto(req)
    return await this.roleService.save(data)
  }

  async findOneOrFail(id: string): Promise<IRole> {
    return await this.roleService.findOneByOrFail({ id })
  }

  async update(id: string, req: RoleUpdateRequest): Promise<IRole> {
    const data = await this.roleService.findOneByOrFail({ id })
    const dataUpdate = RoleUpdateRequest.dto(data, req)
    return await this.roleService.save(dataUpdate)
  }

  async delete(id: string): Promise<IRole> {
    await this.roleService.delete(id)
    return await this.roleService.findOneByOrFail({ id })
  }
}
