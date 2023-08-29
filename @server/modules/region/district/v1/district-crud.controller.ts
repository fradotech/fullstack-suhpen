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
import { DistrictIndexApp } from '../infrastructure/district-index.app'
import { DistrictIndexRequest } from '../infrastructure/district-index.request'
import { DistrictResponse } from '../infrastructure/district.response'
import { DistrictCrudApp } from './district-crud.app'
import {
  DistrictCreateRequest,
  DistrictUpdateRequest,
} from './district.request'

const THIS_MODULE = Modules.District

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class DistrictCrudController {
  constructor(
    private readonly districtIndexApp: DistrictIndexApp,
    private readonly districtCrudApp: DistrictCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: DistrictIndexRequest,
  ): Promise<IApiRes<DistrictResponse[]>> {
    const res = await this.districtIndexApp.fetch(req)
    return ApiRes.dto(DistrictResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: DistrictCreateRequest,
  ): Promise<IApiRes<DistrictResponse>> {
    const data = await this.districtCrudApp.create(req)
    return ApiRes.dto(DistrictResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<DistrictResponse>> {
    const data = await this.districtCrudApp.findOneOrFail(id)
    return ApiRes.dto(DistrictResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: DistrictUpdateRequest,
  ): Promise<IApiRes<DistrictResponse>> {
    const data = await this.districtCrudApp.update(id, req)
    return ApiRes.dto(DistrictResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<DistrictResponse>> {
    const data = await this.districtCrudApp.delete(id)
    return ApiRes.dto(DistrictResponse.dto(data))
  }
}
