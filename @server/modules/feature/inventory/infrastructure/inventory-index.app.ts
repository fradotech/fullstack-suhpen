import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Repository } from 'typeorm'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import {
  IIndexAppRelation,
  IPaginateResponse,
} from '../../../../infrastructure/index/index.interface'
import { InventoryIndexRequest } from './inventory-index.request'
import { EntInventory } from './inventory.entity'
import { IInventory } from './inventory.interface'

@Injectable({ scope: Scope.REQUEST })
export class InventoryIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(EntInventory)
    private readonly inventoryRepo: Repository<IInventory>,
  ) {
    super()
  }

  async fetch(
    req: InventoryIndexRequest,
  ): Promise<IPaginateResponse<IInventory>> {
    const tableName = 'inventory'
    const tableKeys = ['stock', 'stockMinimum']
    const relations: IIndexAppRelation[] = []

    const query = this.createQueryIndex(
      req,
      this.inventoryRepo.createQueryBuilder(tableName),
      tableName,
      tableKeys,
      relations,
      this.inventoryRepo,
      this.request,
    )

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
