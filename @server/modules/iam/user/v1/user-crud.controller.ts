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
import { SuperAdminGuard } from '../../auth/common/super-admin.guard'
import { UserIndexApp } from '../infrastructure/user-index.app'
import { UserIndexRequest } from '../infrastructure/user-index.request'
import {
  UserCreateRequest,
  UserUpdateRequest,
} from '../infrastructure/user.request'
import { UserStrictResponse } from '../infrastructure/user.response'
import { UserCrudApp } from './user-crud.app'

const THIS_MODULE = Modules.User

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(SuperAdminGuard)
export class UserCrudController implements BaseCrudController {
  constructor(
    private readonly userIndexApp: UserIndexApp,
    private readonly userCrudApp: UserCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: UserIndexRequest,
  ): Promise<IApiRes<UserStrictResponse[]>> {
    const res = await this.userIndexApp.fetch(req)
    return ApiRes.fromEntity(
      UserStrictResponse.fromEntities(res.data),
      res.meta,
    )
  }

  @Post()
  async create(
    @Body() req: UserCreateRequest,
  ): Promise<IApiRes<UserStrictResponse>> {
    const data = await this.userCrudApp.create(req)
    return ApiRes.fromEntity(UserStrictResponse.fromEntity(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<UserStrictResponse>> {
    const data = await this.userCrudApp.findOneOrFail(id)
    return ApiRes.fromEntity(UserStrictResponse.fromEntity(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: UserUpdateRequest,
  ): Promise<IApiRes<UserStrictResponse>> {
    const data = await this.userCrudApp.update(id, req)
    return ApiRes.fromEntity(UserStrictResponse.fromEntity(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<UserStrictResponse>> {
    const data = await this.userCrudApp.delete(id)
    return ApiRes.fromEntity(UserStrictResponse.fromEntity(data))
  }
}
