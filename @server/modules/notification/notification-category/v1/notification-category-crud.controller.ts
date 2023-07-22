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
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { NotificationCategoryIndexApp } from '../infrastructure/notification-category-index.app'
import { NotificationCategoryIndexRequest } from '../infrastructure/notification-category-index.request'
import {
  NotificationCategoryCreateRequest,
  NotificationCategoryUpdateRequest,
} from '../infrastructure/notification-category.request'
import { NotificationCategoryResponse } from '../infrastructure/notification-category.response'
import { NotificationCategoryCrudApp } from './notification-category-crud.app'

const THIS_MODULE = Modules.NotificationCategory

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class NotificationCategoryCrudController implements BaseCrudController {
  constructor(
    private readonly notificationCategoryIndexApp: NotificationCategoryIndexApp,
    private readonly notificationCategoryCrudApp: NotificationCategoryCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: NotificationCategoryIndexRequest,
  ): Promise<IApiRes<NotificationCategoryResponse[]>> {
    const res = await this.notificationCategoryIndexApp.fetch(req)
    return ApiRes.dto(NotificationCategoryResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: NotificationCategoryCreateRequest,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const data = await this.notificationCategoryCrudApp.create(req)
    return ApiRes.dto(NotificationCategoryResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const data = await this.notificationCategoryCrudApp.findOneOrFail(id)
    return ApiRes.dto(NotificationCategoryResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: NotificationCategoryUpdateRequest,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const data = await this.notificationCategoryCrudApp.update(id, req)
    return ApiRes.dto(NotificationCategoryResponse.dto(data))
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const data = await this.notificationCategoryCrudApp.delete(id)
    return ApiRes.dto(NotificationCategoryResponse.dto(data))
  }
}
