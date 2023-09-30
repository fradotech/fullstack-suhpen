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
import { NotificationPushIndexRequest } from '../infrastructure/notification-push-index.request'
import { NotificationPushIndexUsecase } from '../infrastructure/notification-push-index.usecase'
import { NotificationPushResponse } from '../infrastructure/notification-push.response'
import { NotificationPushCrudUsecase } from './notification-push-crud.usecase'
import {
  NotificationPushCreateRequest,
  NotificationPushUpdateRequest,
} from './notification-push.request'

const THIS_MODULE = Modules.NotificationPush

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class NotificationPushCrudController
  implements Exactly<IBaseCrudController, NotificationPushCrudController>
{
  constructor(
    private readonly notificationPushIndexUsecase: NotificationPushIndexUsecase,
    private readonly notificationPushCrudUsecase: NotificationPushCrudUsecase,
  ) {}

  @Get()
  async fetch(
    @Query() req: NotificationPushIndexRequest,
  ): Promise<IApiRes<NotificationPushResponse[]>> {
    const res = await this.notificationPushIndexUsecase.fetch(req)
    return ApiRes.dto(NotificationPushResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: NotificationPushCreateRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushCrudUsecase.create(req)
    return ApiRes.dto(NotificationPushResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushCrudUsecase.findOneOrFail(id)
    return ApiRes.dto(NotificationPushResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: NotificationPushUpdateRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushCrudUsecase.update(id, req)
    return ApiRes.dto(NotificationPushResponse.dto(data))
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushCrudUsecase.delete(id)
    return ApiRes.dto(NotificationPushResponse.dto(data))
  }
}
