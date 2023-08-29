import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { LoggedInGuard } from '@server/modules/iam/auth/common/logged-in.guard'
import { Modules } from '@server/modules/modules'
import { ProvinceIndexApp } from '../infrastructure/province-index.app'
import { ProvinceIndexRequest } from '../infrastructure/province-index.request'
import { ProvinceResponse } from '../infrastructure/province.response'
import { ProvinceCrudApp } from './province-crud.app'
import { ProvinceUpdateRequest } from './province.request'

const THIS_MODULE = Modules.Province

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class ProvinceCrudController {
  constructor(
    private readonly provinceIndexApp: ProvinceIndexApp,
    private readonly provinceCrudApp: ProvinceCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: ProvinceIndexRequest,
  ): Promise<IApiRes<ProvinceResponse[]>> {
    const res = await this.provinceIndexApp.fetch(req)
    return ApiRes.dto(ProvinceResponse.dtos(res.data), res.meta)
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<ProvinceResponse>> {
    const data = await this.provinceCrudApp.findOneOrFail(id)
    return ApiRes.dto(ProvinceResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: ProvinceUpdateRequest,
  ): Promise<IApiRes<ProvinceResponse>> {
    const data = await this.provinceCrudApp.update(id, req)
    return ApiRes.dto(ProvinceResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<ProvinceResponse>> {
    const data = await this.provinceCrudApp.delete(id)
    return ApiRes.dto(ProvinceResponse.dto(data))
  }
}
