import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { PushNotificationResponse } from '../../infrastructure/push-notification.response'
import { PushNotificationReadApp } from './push-notification-read.app'
import {
  PushNotificationReadManyRequest,
  PushNotificationReadOneRequest,
} from './push-notification-read.request'

const THIS_MODULE = Modules.PushNotificationRead

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class PushNotificationReadController {
  constructor(
    private readonly pushNotificationReadApp: PushNotificationReadApp,
  ) {}

  @Get()
  async fetch(): Promise<IApiRes<PushNotificationResponse[]>> {
    const data = await this.pushNotificationReadApp.fetch()
    return ApiRes.dto(PushNotificationResponse.dtos(data))
  }

  @Patch('one')
  async readOne(
    @Body() req: PushNotificationReadOneRequest,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const data = await this.pushNotificationReadApp.readOne(req.id)
    return ApiRes.dto(PushNotificationResponse.dto(data))
  }

  @Patch('many')
  async readMany(
    @Body() req: PushNotificationReadManyRequest,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const data = await this.pushNotificationReadApp.readMany(req.ids)
    return ApiRes.dto(PushNotificationResponse.dtos(data))
  }
}
