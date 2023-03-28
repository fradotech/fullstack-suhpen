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
import { CategoryIndexRequest } from './category-index.request'
import { EntCategory } from './category.entity'
import { ICategory } from './category.interface'

@Injectable({ scope: Scope.REQUEST })
export class CategoryIndexApp extends BaseIndexApp {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(EntCategory)
    private readonly categoryRepo: Repository<ICategory>,
  ) {
    super()
  }

  async fetch(
    req: CategoryIndexRequest,
  ): Promise<IPaginateResponse<ICategory>> {
    const tableName = 'category'
    const tableColumns = ['name', 'key', 'isActive', 'createdAt']
    const relations: IIndexAppRelation[] = []
    const query = this.createQueryIndex(
      req,
      this.categoryRepo.createQueryBuilder(tableName),
      tableName,
      tableColumns,
      relations,
      this.categoryRepo,
      this.request,
    )

    // TODO: add additional query

    const [data, count] = await this.getData(query, req.isExport)
    const meta = this.mapMeta(count, req)

    return { data, meta }
  }
}
