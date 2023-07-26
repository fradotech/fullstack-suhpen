import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { BaseCrudController } from '@server/infrastructure/base/base-crud.controller'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import { LoggedInGuard } from '../../auth/common/logged-in.guard'
import { RoleIndexApp } from '../infrastructure/role-index.app'
import { RoleIndexRequest } from '../infrastructure/role-index.request'
import { RoleResponse } from '../infrastructure/role.response'
import { RoleCrudApp } from './role-crud.app'
import { RoleCreateRequest, RoleUpdateRequest } from './role.request'

const THIS_MODULE = Modules.Role

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class RoleCrudController implements BaseCrudController {
  constructor(
    private readonly roleIndexApp: RoleIndexApp,
    private readonly roleCrudApp: RoleCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: RoleIndexRequest,
  ): Promise<IApiRes<RoleResponse[]>> {
    const res = await this.roleIndexApp.fetch(req)
    return ApiRes.dto(RoleResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(@Body() req: RoleCreateRequest): Promise<IApiRes<RoleResponse>> {
    const data = await this.roleCrudApp.create(req)
    return ApiRes.dto(RoleResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(@Param('id') id: string): Promise<IApiRes<RoleResponse>> {
    const data = await this.roleCrudApp.findOneOrFail(id)
    return ApiRes.dto(RoleResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: RoleUpdateRequest,
  ): Promise<IApiRes<RoleResponse>> {
    const data = await this.roleCrudApp.update(id, req)
    return ApiRes.dto(RoleResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<RoleResponse>> {
    const data = await this.roleCrudApp.delete(id)
    return ApiRes.dto(RoleResponse.dto(data))
  }
}
