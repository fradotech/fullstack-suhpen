import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { ERole } from '@server/modules/iam/role/infrastructure/role.enum'
import { Modules } from '@server/modules/modules'
import { AdminGuard } from '../../auth/common/admin.guard'
import { IRole } from '../infrastructure/role.interface'
import { RoleResponse } from '../infrastructure/role.response'
import { RoleService } from '../infrastructure/role.service'

const THIS_MODULE = Modules.Role

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async find(): Promise<IApiRes<IRole[]>> {
    const res = await this.roleService.find()
    return ApiRes.fromEntity(RoleResponse.fromEntities(res))
  }

  @Get(':name')
  async findOne(
    @Query('name') name: ERole,
  ): Promise<IApiRes<IRole | undefined>> {
    const res = await this.roleService.findOne(name)
    return ApiRes.fromEntity(RoleResponse.fromEntity(res))
  }
}
