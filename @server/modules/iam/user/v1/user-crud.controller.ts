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
import { UserIndexRequest } from '../infrastructure/user-index.request'
import { UserIndexUsecase } from '../infrastructure/user-index.usecase'
import { UserStrictResponse } from '../infrastructure/user.response'
import { UserCrudUsecase } from './user-crud.usecase'
import { UserCreateRequest, UserUpdateRequest } from './user.request'

const THIS_MODULE = Modules.User

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class UserCrudController
  implements Exactly<IBaseCrudController, UserCrudController>
{
  constructor(
    private readonly userIndexUsecase: UserIndexUsecase,
    private readonly userCrudUsecase: UserCrudUsecase,
  ) {}

  @Get()
  async fetch(
    @Query() req: UserIndexRequest,
  ): Promise<IApiRes<UserStrictResponse[]>> {
    const res = await this.userIndexUsecase.fetch(req)
    return ApiRes.dto(UserStrictResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: UserCreateRequest,
  ): Promise<IApiRes<UserStrictResponse>> {
    const data = await this.userCrudUsecase.create(req)
    return ApiRes.dto(UserStrictResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<UserStrictResponse>> {
    const data = await this.userCrudUsecase.findOneOrFail(id)
    return ApiRes.dto(UserStrictResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: UserUpdateRequest,
  ): Promise<IApiRes<UserStrictResponse>> {
    const data = await this.userCrudUsecase.update(id, req)
    return ApiRes.dto(UserStrictResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<UserStrictResponse>> {
    const data = await this.userCrudUsecase.delete(id)
    return ApiRes.dto(UserStrictResponse.dto(data))
  }
}
