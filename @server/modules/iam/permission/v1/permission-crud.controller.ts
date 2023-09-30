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
import { IBaseCrudController } from '@server/infrastructure/base/base-crud-controller.interface'
import { Exactly } from '@server/infrastructure/base/base.util'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import { LoggedInGuard } from '../../auth/common/logged-in.guard'
import { PermissionIndexRequest } from '../infrastructure/permission-index.request'
import { PermissionIndexUsecase } from '../infrastructure/permission-index.usecase'
import { PermissionResponse } from '../infrastructure/permission.response'
import { PermissionCrudUsecase } from './permission-crud.usecase'
import {
  PermissionCreateRequest,
  PermissionUpdateRequest,
} from './permission.request'

const THIS_MODULE = Modules.Permission

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class PermissionCrudController
  implements Exactly<IBaseCrudController, PermissionCrudController>
{
  constructor(
    private readonly permissionIndexUsecase: PermissionIndexUsecase,
    private readonly permissionCrudUsecase: PermissionCrudUsecase,
  ) {}

  @Get()
  async fetch(
    @Query() req: PermissionIndexRequest,
  ): Promise<IApiRes<PermissionResponse[]>> {
    const res = await this.permissionIndexUsecase.fetch(req)
    return ApiRes.dto(PermissionResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: PermissionCreateRequest,
  ): Promise<IApiRes<PermissionResponse>> {
    const data = await this.permissionCrudUsecase.create(req)
    return ApiRes.dto(PermissionResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<PermissionResponse>> {
    const data = await this.permissionCrudUsecase.findOneOrFail(id)
    return ApiRes.dto(PermissionResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: PermissionUpdateRequest,
  ): Promise<IApiRes<PermissionResponse>> {
    const data = await this.permissionCrudUsecase.update(id, req)
    return ApiRes.dto(PermissionResponse.dto(data))
  }

  // @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<PermissionResponse>> {
    const data = await this.permissionCrudUsecase.delete(id)
    return ApiRes.dto(PermissionResponse.dto(data))
  }
}
