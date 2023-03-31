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
import { InventoryIndexApp } from '../infrastructure/inventory-index.app'
import { InventoryIndexRequest } from '../infrastructure/inventory-index.request'
import {
  InventoryCreateRequest,
  InventoryUpdateRequest,
} from '../infrastructure/inventory.request'
import { InventoryResponse } from '../infrastructure/inventory.response'
import { InventoryCrudApp } from './inventory-crud.app'

const THIS_MODULE = Modules.Inventory

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
export class InventoryCrudController implements BaseCrudController {
  constructor(
    private readonly inventoryIndexApp: InventoryIndexApp,
    private readonly inventoryCrudApp: InventoryCrudApp,
  ) {}

  @Get()
  async fetch(
    @Query() req: InventoryIndexRequest,
  ): Promise<IApiRes<InventoryResponse[]>> {
    const res = await this.inventoryIndexApp.fetch(req)
    return ApiRes.fromEntity(InventoryResponse.fromEntities(res.data), res.meta)
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @Body() req: InventoryCreateRequest,
  ): Promise<IApiRes<InventoryResponse>> {
    const data = await this.inventoryCrudApp.create(req)
    return ApiRes.fromEntity(InventoryResponse.fromEntity(data))
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async findOneOrFail(
    @Param('id') id: string,
  ): Promise<IApiRes<InventoryResponse>> {
    const data = await this.inventoryCrudApp.findOneOrFail(id)
    return ApiRes.fromEntity(InventoryResponse.fromEntity(data))
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() req: InventoryUpdateRequest,
  ): Promise<IApiRes<InventoryResponse>> {
    const data = await this.inventoryCrudApp.update(id, req)
    return ApiRes.fromEntity(InventoryResponse.fromEntity(data))
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiRes<InventoryResponse>> {
    const data = await this.inventoryCrudApp.softRemove(id)
    return ApiRes.fromEntity(InventoryResponse.fromEntity(data))
  }
}
