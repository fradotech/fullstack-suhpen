import {
  Body,
  Controller,
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
import { PermissionIndexApp } from '../infrastructure/permission-index.app'
import { PermissionIndexRequest } from '../infrastructure/permission-index.request'
import { PermissionResponse } from '../infrastructure/permission.response'
import { PermissionCrudApp } from './permission-crud.app'
import {
  PermissionCreateRequest,
  PermissionUpdateRequest,
} from './permission.request'

const THIS_MODULE = Modules.Permission

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class PermissionCrudController implements BaseCrudController {
  constructor(
    private readonly permissionIndexApp: PermissionIndexApp,
    private readonly permissionCrudApp: PermissionCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: PermissionIndexRequest,
  ): Promise<IApiRes<PermissionResponse[]>> {
    const res = await this.permissionIndexApp.fetch(req)
    return ApiRes.dto(PermissionResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: PermissionCreateRequest,
  ): Promise<IApiRes<PermissionResponse>> {
    const data = await this.permissionCrudApp.create(req)
    return ApiRes.dto(PermissionResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<PermissionResponse>> {
    const data = await this.permissionCrudApp.findOneOrFail(id)
    return ApiRes.dto(PermissionResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: PermissionUpdateRequest,
  ): Promise<IApiRes<PermissionResponse>> {
    const data = await this.permissionCrudApp.update(id, req)
    return ApiRes.dto(PermissionResponse.dto(data))
  }

  // @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<PermissionResponse>> {
    const data = await this.permissionCrudApp.delete(id)
    return ApiRes.dto(PermissionResponse.dto(data))
  }
}
