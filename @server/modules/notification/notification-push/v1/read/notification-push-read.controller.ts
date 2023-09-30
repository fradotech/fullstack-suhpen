import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { UserLogged } from '@server/modules/iam/user/common/get-user-logged.decorator'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Modules } from '@server/modules/modules'
import { NotificationPushResponse } from '../../infrastructure/notification-push.response'
import { NotificationPushCrudUsecase } from '../notification-push-crud.usecase'
import {
  NotificationPushReadManyRequest,
  NotificationPushReadOneRequest,
} from './notification-push-read.request'
import { NotificationPushReadUsecase } from './notification-push-read.usecase'

const THIS_MODULE = Modules.NotificationPushRead

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class NotificationPushReadController {
  constructor(
    private readonly notificationPushReadUsecase: NotificationPushReadUsecase,
    private readonly notificationPushCrudUsecase: NotificationPushCrudUsecase,
  ) {}

  @Get()
  async fetch(
    @UserLogged() userLogged: IUser,
  ): Promise<IApiRes<NotificationPushResponse[]>> {
    const data = await this.notificationPushReadUsecase.fetch()
    return ApiRes.dto(NotificationPushResponse.dtos(data, userLogged))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushCrudUsecase.findOneOrFail(id)
    return ApiRes.dto(NotificationPushResponse.dto(data))
  }

  @Patch('one')
  async readOne(
    @Body() req: NotificationPushReadOneRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushReadUsecase.readOne(req.id)
    return ApiRes.dto(NotificationPushResponse.dto(data))
  }

  @Patch('many')
  async readMany(
    @Body() req: NotificationPushReadManyRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const data = await this.notificationPushReadUsecase.readMany(req.ids)
    return ApiRes.dto(NotificationPushResponse.dtos(data))
  }
}
