import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { UserLogged } from '@server/modules/iam/user/common/get-user-logged.decorator'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Modules } from '@server/modules/modules'
import { NotificationPushResponse } from '../../infrastructure/notification-push.response'
import { NotificationPushCrudApp } from '../notification-push-crud.app'
import { NotificationPushReadApp } from './notification-push-read.app'
import {
  NotificationPushReadManyRequest,
  NotificationPushReadOneRequest,
} from './notification-push-read.request'

const THIS_MODULE = Modules.NotificationPushRead

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class NotificationPushReadController {
  constructor(
    private readonly notificationPushReadApp: NotificationPushReadApp,
    private readonly notificationPushCrudApp: NotificationPushCrudApp,
  ) {}

  @Get()
  async fetch(
    @UserLogged() userLogged: IUser,
  ): Promise<IApiRes<NotificationPushResponse[]>> {
    const data = await this.notificationPushReadApp.fetch()
    return ApiRes.dto(NotificationPushResponse.dtos(data, userLogged))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushCrudApp.findOneOrFail(id)
    return ApiRes.dto(NotificationPushResponse.dto(data))
  }

  @Patch('one')
  async readOne(
    @Body() req: NotificationPushReadOneRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushReadApp.readOne(req.id)
    return ApiRes.dto(NotificationPushResponse.dto(data))
  }

  @Patch('many')
  async readMany(
    @Body() req: NotificationPushReadManyRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushReadApp.readMany(req.ids)
    return ApiRes.dto(NotificationPushResponse.dtos(data))
  }
}
