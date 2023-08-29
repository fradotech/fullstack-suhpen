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
import { CityIndexApp } from '../infrastructure/city-index.app'
import { CityIndexRequest } from '../infrastructure/city-index.request'
import { CityResponse } from '../infrastructure/city.response'
import { CityCrudApp } from './city-crud.app'
import { CityCreateRequest, CityUpdateRequest } from './city.request'

const THIS_MODULE = Modules.City

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class CityCrudController {
  constructor(
    private readonly cityIndexApp: CityIndexApp,
    private readonly cityCrudApp: CityCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: CityIndexRequest,
  ): Promise<IApiRes<CityResponse[]>> {
    const res = await this.cityIndexApp.fetch(req)
    return ApiRes.dto(CityResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(@Body() req: CityCreateRequest): Promise<IApiRes<CityResponse>> {
    const data = await this.cityCrudApp.create(req)
    return ApiRes.dto(CityResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(@Param('id') id: string): Promise<IApiRes<CityResponse>> {
    const data = await this.cityCrudApp.findOneOrFail(id)
    return ApiRes.dto(CityResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: CityUpdateRequest,
  ): Promise<IApiRes<CityResponse>> {
    const data = await this.cityCrudApp.update(id, req)
    return ApiRes.dto(CityResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<CityResponse>> {
    const data = await this.cityCrudApp.delete(id)
    return ApiRes.dto(CityResponse.dto(data))
  }
}
