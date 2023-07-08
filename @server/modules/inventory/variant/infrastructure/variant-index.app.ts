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
import { VariantIndexRequest } from './variant-index.request'
import { EntVariant } from './variant.entity'
import { IVariant } from './variant.interface'

@Injectable({ scope: Scope.REQUEST })
export class VariantIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(EntVariant)
    private readonly variantRepo: Repository<IVariant>,
  ) {
    super()
  }

  async fetch(req: VariantIndexRequest): Promise<IPaginateResponse<IVariant>> {
    const name = 'variant'
    const columns = ['sku', 'stock', 'buyPrice', 'sellPrice', 'marginPrice']
    const relations: IIndexAppRelation[] = [
      {
        name: 'product',
        columns: ['name'],
      },
    ]

    const query = this.createQueryIndex(
      req,
      name,
      columns,
      relations,
      this.variantRepo,
      this.request,
    )

    if (req.productId) {
      query.andWhere('product.id = :productId', { productId: req.productId })
    }

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
