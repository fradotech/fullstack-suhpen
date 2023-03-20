import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Repository } from 'typeorm'
import { BaseIndexApp } from '../../../../infrastructure/index/index.app'
import { IPaginateResponse } from '../../../../infrastructure/index/index.interface'
import { ProductIndexRequest } from './product-index.request'
import { EntProduct } from './product.entity'
import { IProduct } from './product.interface'

@Injectable({ scope: Scope.REQUEST })
export class ProductIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(EntProduct)
    private readonly productRepo: Repository<IProduct>,
  ) {
    super()
  }

  async fetch(req: ProductIndexRequest): Promise<IPaginateResponse<IProduct>> {
    const tableName = 'product'
    const tableKeys = [
      'name',
      'stock',
      'price',
      'discountPercentage',
      'brand',
      'createdAt',
    ]
    const query = this.createQueryIndex(
      req,
      this.productRepo.createQueryBuilder(tableName),
      tableName,
      tableKeys,
      this.productRepo,
      this.request,
    )

    // TODO: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
