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
    private readonly productIndexApp: CategoryIndexApp,
    private readonly productCrudApp: CategoryCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: CategoryIndexRequest,
  ): Promise<IApiRes<CategoryResponse[]>> {
    const res = await this.productIndexApp.fetch(req)
    return ApiRes.fromEntity(CategoryResponse.fromEntities(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: CategoryCreateRequest,
  ): Promise<IApiRes<CategoryResponse>> {
    const data = await this.productCrudApp.create(req)
    return ApiRes.fromEntity(CategoryResponse.fromEntity(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<CategoryResponse>> {
    const data = await this.productCrudApp.findOneOrFail(id)
    return ApiRes.fromEntity(CategoryResponse.fromEntity(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: CategoryUpdateRequest,
  ): Promise<IApiRes<CategoryResponse>> {
    const data = await this.productCrudApp.update(id, req)
    return ApiRes.fromEntity(CategoryResponse.fromEntity(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<CategoryResponse>> {
    const data = await this.productCrudApp.softRemove(id)
    return ApiRes.fromEntity(CategoryResponse.fromEntity(data))
  }
}
