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
import { ProductIndexApp } from '../infrastructure/product-index.app'
import { ProductIndexRequest } from '../infrastructure/product-index.request'
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from '../infrastructure/product.request'
import { ProductResponse } from '../infrastructure/product.response'
import { ProductCrudApp } from './product-crud.app'

const THIS_MODULE = Modules.Product

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class ProductCrudController implements BaseCrudController {
  constructor(
    private readonly productIndexApp: ProductIndexApp,
    private readonly productCrudApp: ProductCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: ProductIndexRequest,
  ): Promise<IApiRes<ProductResponse[]>> {
    const res = await this.productIndexApp.fetch(req)
    return ApiRes.dto(ProductResponse.dtos(res.data), res.meta)
  }

  @Post()
  async create(
    @Body() req: ProductCreateRequest,
  ): Promise<IApiRes<ProductResponse>> {
    const data = await this.productCrudApp.create(req)
    return ApiRes.dto(ProductResponse.dto(data))
  }

  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<ProductResponse>> {
    const data = await this.productCrudApp.findOneOrFail(id)
    return ApiRes.dto(ProductResponse.dto(data))
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: ProductUpdateRequest,
  ): Promise<IApiRes<ProductResponse>> {
    const data = await this.productCrudApp.update(id, req)
    return ApiRes.dto(ProductResponse.dto(data))
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<ProductResponse>> {
    const data = await this.productCrudApp.delete(id)
    return ApiRes.dto(ProductResponse.dto(data))
  }
}
