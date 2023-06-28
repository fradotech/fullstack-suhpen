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
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { PermissionIndexApp } from '../infrastructure/permission-index.app'
import { PermissionIndexRequest } from '../infrastructure/permission-index.request'
import {
  PermissionCreateRequest,
  PermissionUpdateRequest,
} from '../infrastructure/permission.request'
import { PermissionResponse } from '../infrastructure/permission.response'
import { PermissionCrudApp } from './permission-crud.app'

const THIS_MODULE = Modules.Permission

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class PermissionCrudController implements BaseCrudController {
  constructor(
    private readonly categoryIndexApp: PermissionIndexApp,
    private readonly categoryCrudApp: PermissionCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: PermissionIndexRequest,
  ): Promise<IApiRes<PermissionResponse[]>> {
    const res = await this.categoryIndexApp.fetch(req)
    return ApiRes.dto(PermissionResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: PermissionCreateRequest,
  ): Promise<IApiRes<PermissionResponse>> {
    const data = await this.categoryCrudApp.create(req)
    return ApiRes.dto(PermissionResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<PermissionResponse>> {
    const data = await this.categoryCrudApp.findOneOrFail(id)
    return ApiRes.dto(PermissionResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: PermissionUpdateRequest,
  ): Promise<IApiRes<PermissionResponse>> {
    const data = await this.categoryCrudApp.update(id, req)
    return ApiRes.dto(PermissionResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<PermissionResponse>> {
    const data = await this.categoryCrudApp.delete(id)
    return ApiRes.dto(PermissionResponse.dto(data))
  }
}
