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
import { CityIndexRequest } from '../infrastructure/city-index.request'
import { CityIndexUsecase } from '../infrastructure/city-index.usecase'
import { CityResponse } from '../infrastructure/city.response'
import { CityCrudUsecase } from './city-crud.usecase'
import { CityCreateRequest, CityUpdateRequest } from './city.request'

const THIS_MODULE = Modules.City

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class CityCrudController {
  constructor(
    private readonly cityIndexUsecase: CityIndexUsecase,
    private readonly cityCrudUsecase: CityCrudUsecase,
  ) {}

  @Get()
  async fetch(
    @Query() req: CityIndexRequest,
  ): Promise<IApiRes<CityResponse[]>> {
    const res = await this.cityIndexUsecase.fetch(req)
    return ApiRes.dto(CityResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(@Body() req: CityCreateRequest): Promise<IApiRes<CityResponse>> {
    const data = await this.cityCrudUsecase.create(req)
    return ApiRes.dto(CityResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(@Param('id') id: string): Promise<IApiRes<CityResponse>> {
    const data = await this.cityCrudUsecase.findOneOrFail(id)
    return ApiRes.dto(CityResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: CityUpdateRequest,
  ): Promise<IApiRes<CityResponse>> {
    const data = await this.cityCrudUsecase.update(id, req)
    return ApiRes.dto(CityResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<CityResponse>> {
    const data = await this.cityCrudUsecase.delete(id)
    return ApiRes.dto(CityResponse.dto(data))
  }
}
