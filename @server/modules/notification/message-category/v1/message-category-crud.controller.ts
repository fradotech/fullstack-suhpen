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
import { MessageCategoryIndexApp } from '../infrastructure/message-category-index.app'
import { MessageCategoryIndexRequest } from '../infrastructure/message-category-index.request'
import {
  MessageCategoryCreateRequest,
  MessageCategoryUpdateRequest,
} from '../infrastructure/message-category.request'
import { MessageCategoryResponse } from '../infrastructure/message-category.response'
import { MessageCategoryCrudApp } from './message-category-crud.app'

const THIS_MODULE = Modules.MessageCategory

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class MessageCategoryCrudController implements BaseCrudController {
  constructor(
    private readonly categoryIndexApp: MessageCategoryIndexApp,
    private readonly categoryCrudApp: MessageCategoryCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: MessageCategoryIndexRequest,
  ): Promise<IApiRes<MessageCategoryResponse[]>> {
    const res = await this.categoryIndexApp.fetch(req)
    return ApiRes.dto(MessageCategoryResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: MessageCategoryCreateRequest,
  ): Promise<IApiRes<MessageCategoryResponse>> {
    const data = await this.categoryCrudApp.create(req)
    return ApiRes.dto(MessageCategoryResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<MessageCategoryResponse>> {
    const data = await this.categoryCrudApp.findOneOrFail(id)
    return ApiRes.dto(MessageCategoryResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: MessageCategoryUpdateRequest,
  ): Promise<IApiRes<MessageCategoryResponse>> {
    const data = await this.categoryCrudApp.update(id, req)
    return ApiRes.dto(MessageCategoryResponse.dto(data))
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<IApiRes<MessageCategoryResponse>> {
    const data = await this.categoryCrudApp.delete(id)
    return ApiRes.dto(MessageCategoryResponse.dto(data))
  }
}
