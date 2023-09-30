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
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { ProvinceIndexRequest } from '../infrastructure/province-index.request'
import { ProvinceIndexUsecase } from '../infrastructure/province-index.usecase'
import { ProvinceResponse } from '../infrastructure/province.response'
import { ProvinceCrudUsecase } from './province-crud.usecase'
import {
  ProvinceCreateRequest,
  ProvinceUpdateRequest,
} from './province.request'

const THIS_MODULE = Modules.Province

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class ProvinceCrudController {
  constructor(
    private readonly provinceIndexUsecase: ProvinceIndexUsecase,
    private readonly provinceCrudUsecase: ProvinceCrudUsecase,
  ) {}

  @Get()
  async fetch(
    @Query() req: ProvinceIndexRequest,
  ): Promise<IApiRes<ProvinceResponse[]>> {
    const res = await this.provinceIndexUsecase.fetch(req)
    return ApiRes.dto(ProvinceResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: ProvinceCreateRequest,
  ): Promise<IApiRes<ProvinceResponse>> {
    const data = await this.provinceCrudUsecase.create(req)
    return ApiRes.dto(ProvinceResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<ProvinceResponse>> {
    const data = await this.provinceCrudUsecase.findOneOrFail(id)
    return ApiRes.dto(ProvinceResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: ProvinceUpdateRequest,
  ): Promise<IApiRes<ProvinceResponse>> {
    const data = await this.provinceCrudUsecase.update(id, req)
    return ApiRes.dto(ProvinceResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<ProvinceResponse>> {
    const data = await this.provinceCrudUsecase.delete(id)
    return ApiRes.dto(ProvinceResponse.dto(data))
  }
}
