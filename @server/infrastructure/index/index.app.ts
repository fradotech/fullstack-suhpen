import {
  OrderDirectionEnum,
  OrderDirectionType,
} from '@server/infrastructure/index/index.enum'
import { Request } from 'express'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IBaseEntity } from '../base/base-entity.interface'
import {
  IPaginateRequest,
  IPaginateResponse,
  IPaginationMeta,
} from './index.interface'
import { IndexRequest } from './index.request'

export abstract class BaseIndexApp {
  readonly DefaultPerPage: number = 10
  readonly DefaultPage: number = 1
  readonly DefaultSort: string = 'created_at'
  readonly DefaultOrder: OrderDirectionType = 'DESC'

  abstract fetch(arg0: any, arg1: any): Promise<IPaginateResponse<IBaseEntity>>

  private countOffset({
    page: page,
    pageSize: perPage,
  }: IPaginateRequest): number {
    page = page ?? this.DefaultPage
    perPage = perPage ?? this.DefaultPerPage

    return (page - 1) * perPage
  }

  private getOrder(order: string): OrderDirectionEnum {
    return order == OrderDirectionEnum.Asc
      ? OrderDirectionEnum.Asc
      : OrderDirectionEnum.Desc
  }

  private take(amount: number): number {
    return amount ?? 10
  }

  private orderByKey(table: string, keys: string[], sort: string): string {
    return keys.includes(sort) ? `${table}.${sort}` : `${table}.updatedAt`
  }

  private querySearch(table: string, keys: string[]): string {
    let querySearch = `CONCAT_WS(''`

    for (const key of keys) {
      querySearch += `, lower(${table}.${key})`
    }

    return (querySearch += ') like :search')
  }

  mapMeta(
    count: number,
    { page: page, pageSize: perPage }: IPaginateRequest,
  ): IPaginationMeta {
    page = page ?? this.DefaultPage
    perPage = perPage ?? this.DefaultPerPage

    return {
      page: page,
      pageSize: perPage,
      total: count,
      totalPage: Math.ceil(count / perPage),
    }
  }

  async getData<T>(
    query: SelectQueryBuilder<T>,
    isExport?: boolean,
  ): Promise<[T[], number]> {
    if (isExport) return [await query.getMany(), null]
    return await query.getManyAndCount()
  }

  // <--- Create Index Query --->

  createQueryIndex<T>(
    req: IndexRequest,
    query: SelectQueryBuilder<T>,
    tableName: string,
    tableKeys: string[],
    repo: Repository<T>,
    request: Request,
  ): SelectQueryBuilder<T> {
    if (req.search) {
      query.andWhere(this.querySearch(tableName, tableKeys), {
        search: `%${req.search.toLowerCase()}%`,
      })
    }

    if (req.startAt && req.endAt) {
      query.andWhere(
        `CAST(${tableName}.updatedAt as DATE) BETWEEN CAST(:startAt AS DATE) AND CAST(:endAt AS DATE)`,
        { startAt: req.startAt, endAt: req.endAt },
      )
    }

    if (req.filters) {
      Object.keys(req.filters).forEach((field) => {
        ;(req.filters[field] as string[]).forEach((value) => {
          query.andWhere(`${tableName}.${field} = :value`, {
            value,
          })
        })
      })
    }

    const isUser = repo.metadata.propertiesMap['user']
    const userId = request['user']['id']

    if (isUser && userId) {
      query
        .leftJoinAndSelect(`${tableName}.user`, 'user')
        .andWhere('user.id = :userId', { userId })
    }

    const sort = this.orderByKey(tableName, tableKeys, req.sortField)
    const order = this.getOrder(req.sortOrder)
    query.orderBy(sort, order)
    query.take(this.take(req.pageSize))
    query.skip(this.countOffset(req))

    return query
  }
}
