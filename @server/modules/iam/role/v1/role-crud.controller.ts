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
import { IBaseCrudController } from '@server/infrastructure/base/base-crud-controller.interface'
import { Exactly } from '@server/infrastructure/base/base.util'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import { LoggedInGuard } from '../../auth/common/logged-in.guard'
import { RoleIndexRequest } from '../infrastructure/role-index.request'
import { RoleIndexUsecase } from '../infrastructure/role-index.usecase'
import { RoleResponse } from '../infrastructure/role.response'
import { RoleCrudUsecase } from './role-crud.usecase'
import { RoleCreateRequest, RoleUpdateRequest } from './role.request'

const THIS_MODULE = Modules.Role

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class RoleCrudController
  implements Exactly<IBaseCrudController, RoleCrudController>
{
  constructor(
    private readonly roleIndexUsecase: RoleIndexUsecase,
    private readonly roleCrudUsecase: RoleCrudUsecase,
  ) {}

  @Get()
  async fetch(
    @Query() req: RoleIndexRequest,
  ): Promise<IApiRes<RoleResponse[]>> {
    const res = await this.roleIndexUsecase.fetch(req)
    return ApiRes.dto(RoleResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(@Body() req: RoleCreateRequest): Promise<IApiRes<RoleResponse>> {
    const data = await this.roleCrudUsecase.create(req)
    return ApiRes.dto(RoleResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(@Param('id') id: string): Promise<IApiRes<RoleResponse>> {
    const data = await this.roleCrudUsecase.findOneOrFail(id)
    return ApiRes.dto(RoleResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: RoleUpdateRequest,
  ): Promise<IApiRes<RoleResponse>> {
    const data = await this.roleCrudUsecase.update(id, req)
    return ApiRes.dto(RoleResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<RoleResponse>> {
    const data = await this.roleCrudUsecase.delete(id)
    return ApiRes.dto(RoleResponse.dto(data))
  }
}
