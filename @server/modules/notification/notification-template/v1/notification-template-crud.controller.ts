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
import { NotificationTemplateIndexRequest } from '../infrastructure/notification-template-index.request'
import { NotificationTemplateIndexUsecase } from '../infrastructure/notification-template-index.usecase'
import { NotificationTemplateResponse } from '../infrastructure/notification-template.response'
import { NotificationTemplateCrudUsecase } from './notification-template-crud.usecase'
import {
  NotificationTemplateCreateRequest,
  NotificationTemplateUpdateRequest,
} from './notification-template.request'

const THIS_MODULE = Modules.NotificationTemplate

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class NotificationTemplateCrudController
  implements Exactly<IBaseCrudController, NotificationTemplateCrudController>
{
  constructor(
    private readonly notificationTemplateIndexUsecase: NotificationTemplateIndexUsecase,
    private readonly notificationTemplateCrudUsecase: NotificationTemplateCrudUsecase,
  ) {}

  @Get()
  async fetch(
    @Query() req: NotificationTemplateIndexRequest,
  ): Promise<IApiRes<NotificationTemplateResponse[]>> {
    const res = await this.notificationTemplateIndexUsecase.fetch(req)
    return ApiRes.dto(NotificationTemplateResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: NotificationTemplateCreateRequest,
  ): Promise<IApiRes<NotificationTemplateResponse>> {
    const data = await this.notificationTemplateCrudUsecase.create(req)
    return ApiRes.dto(NotificationTemplateResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationTemplateResponse>> {
    const data = await this.notificationTemplateCrudUsecase.findOneOrFail(id)
    return ApiRes.dto(NotificationTemplateResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: NotificationTemplateUpdateRequest,
  ): Promise<IApiRes<NotificationTemplateResponse>> {
    const data = await this.notificationTemplateCrudUsecase.update(id, req)
    return ApiRes.dto(NotificationTemplateResponse.dto(data))
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<IApiRes<NotificationTemplateResponse>> {
    const data = await this.notificationTemplateCrudUsecase.delete(id)
    return ApiRes.dto(NotificationTemplateResponse.dto(data))
  }
}
