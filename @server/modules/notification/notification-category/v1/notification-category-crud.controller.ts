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
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { NotificationCategoryIndexRequest } from '../infrastructure/notification-category-index.request'
import { NotificationCategoryIndexUsecase } from '../infrastructure/notification-category-index.usecase'
import { NotificationCategoryResponse } from '../infrastructure/notification-category.response'
import { NotificationCategoryCrudUsecase } from './notification-category-crud.usecase'
import {
  NotificationCategoryCreateRequest,
  NotificationCategoryUpdateRequest,
} from './notification-category.request'

const THIS_MODULE = Modules.NotificationCategory

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class NotificationCategoryCrudController
  implements Exactly<IBaseCrudController, NotificationCategoryCrudController>
{
  constructor(
    private readonly notificationCategoryIndexUsecase: NotificationCategoryIndexUsecase,
    private readonly notificationCategoryCrudUsecase: NotificationCategoryCrudUsecase,
  ) {}

  @Get()
  async fetch(
    @Query() req: NotificationCategoryIndexRequest,
  ): Promise<IApiRes<NotificationCategoryResponse[]>> {
    const res = await this.notificationCategoryIndexUsecase.fetch(req)
    return ApiRes.dto(NotificationCategoryResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: NotificationCategoryCreateRequest,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const data = await this.notificationCategoryCrudUsecase.create(req)
    return ApiRes.dto(NotificationCategoryResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const data = await this.notificationCategoryCrudUsecase.findOneOrFail(id)
    return ApiRes.dto(NotificationCategoryResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: NotificationCategoryUpdateRequest,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const data = await this.notificationCategoryCrudUsecase.update(id, req)
    return ApiRes.dto(NotificationCategoryResponse.dto(data))
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const data = await this.notificationCategoryCrudUsecase.delete(id)
    return ApiRes.dto(NotificationCategoryResponse.dto(data))
  }
}
