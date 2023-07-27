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
import { PushNotificationIndexApp } from '../infrastructure/push-notification-index.app'
import { PushNotificationIndexRequest } from '../infrastructure/push-notification-index.request'
import { PushNotificationResponse } from '../infrastructure/push-notification.response'
import { PushNotificationCrudApp } from './push-notification-crud.app'
import {
  PushNotificationCreateRequest,
  PushNotificationUpdateRequest,
} from './push-notification.request'

const THIS_MODULE = Modules.PushNotification

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class PushNotificationCrudController implements BaseCrudController {
  constructor(
    private readonly pushNotificationIndexApp: PushNotificationIndexApp,
    private readonly pushNotificationCrudApp: PushNotificationCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: PushNotificationIndexRequest,
  ): Promise<IApiRes<PushNotificationResponse[]>> {
    const res = await this.pushNotificationIndexApp.fetch(req)
    return ApiRes.dto(PushNotificationResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: PushNotificationCreateRequest,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const data = await this.pushNotificationCrudApp.create(req)
    return ApiRes.dto(PushNotificationResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const data = await this.pushNotificationCrudApp.findOneOrFail(id)
    return ApiRes.dto(PushNotificationResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: PushNotificationUpdateRequest,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const data = await this.pushNotificationCrudApp.update(id, req)
    return ApiRes.dto(PushNotificationResponse.dto(data))
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const data = await this.pushNotificationCrudApp.delete(id)
    return ApiRes.dto(PushNotificationResponse.dto(data))
  }
}
