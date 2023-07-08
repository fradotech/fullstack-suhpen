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
import { VariantIndexApp } from '../infrastructure/variant-index.app'
import { VariantIndexRequest } from '../infrastructure/variant-index.request'
import {
  VariantCreateRequest,
  VariantUpdateRequest,
} from '../infrastructure/variant.request'
import { VariantResponse } from '../infrastructure/variant.response'
import { VariantCrudApp } from './variant-crud.app'

const THIS_MODULE = Modules.Variant

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
export class VariantCrudController implements BaseCrudController {
  constructor(
    private readonly variantIndexApp: VariantIndexApp,
    private readonly variantCrudApp: VariantCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: VariantIndexRequest,
  ): Promise<IApiRes<VariantResponse[]>> {
    const res = await this.variantIndexApp.fetch(req)
    return ApiRes.dto(VariantResponse.dtos(res.data), res.meta)
  }

  @UseGuards(LoggedInGuard)
  @Post()
  async create(
    @Body() req: VariantCreateRequest,
  ): Promise<IApiRes<VariantResponse>> {
    const data = await this.variantCrudApp.create(req)
    return ApiRes.dto(VariantResponse.dto(data))
  }

  @UseGuards(LoggedInGuard)
  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<VariantResponse>> {
    const data = await this.variantCrudApp.findOneOrFail(id)
    return ApiRes.dto(VariantResponse.dto(data))
  }

  @UseGuards(LoggedInGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: VariantUpdateRequest,
  ): Promise<IApiRes<VariantResponse>> {
    const data = await this.variantCrudApp.update(id, req)
    return ApiRes.dto(VariantResponse.dto(data))
  }

  @UseGuards(LoggedInGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<VariantResponse>> {
    const data = await this.variantCrudApp.delete(id)
    return ApiRes.dto(VariantResponse.dto(data))
  }
}
