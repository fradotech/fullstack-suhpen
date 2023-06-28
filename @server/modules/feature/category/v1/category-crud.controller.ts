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
import { AdminGuard } from '@server/modules/iam/auth/common/admin.guard'
import { Modules } from '@server/modules/modules'
import { CategoryIndexApp } from '../infrastructure/category-index.app'
import { CategoryIndexRequest } from '../infrastructure/category-index.request'
import {
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from '../infrastructure/category.request'
import { CategoryResponse } from '../infrastructure/category.response'
import { CategoryCrudApp } from './category-crud.app'

const THIS_MODULE = Modules.Category

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class CategoryCrudController implements BaseCrudController {
  constructor(
    private readonly categoryIndexApp: CategoryIndexApp,
    private readonly categoryCrudApp: CategoryCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: CategoryIndexRequest,
  ): Promise<IApiRes<CategoryResponse[]>> {
    const res = await this.categoryIndexApp.fetch(req)
    return ApiRes.dto(CategoryResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: CategoryCreateRequest,
  ): Promise<IApiRes<CategoryResponse>> {
    const data = await this.categoryCrudApp.create(req)
    return ApiRes.dto(CategoryResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<CategoryResponse>> {
    const data = await this.categoryCrudApp.findOneOrFail(id)
    return ApiRes.dto(CategoryResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: CategoryUpdateRequest,
  ): Promise<IApiRes<CategoryResponse>> {
    const data = await this.categoryCrudApp.update(id, req)
    return ApiRes.dto(CategoryResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<CategoryResponse>> {
    const data = await this.categoryCrudApp.delete(id)
    return ApiRes.dto(CategoryResponse.dto(data))
  }
}
