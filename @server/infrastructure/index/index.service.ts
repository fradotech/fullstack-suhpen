import {
  OrderDirectionEnum,
  OrderDirectionType,
} from '@server/infrastructure/index/index.enum'
import { SelectQueryBuilder } from 'typeorm'
import { IBaseEntity } from '../base/base-entity.interface'
import {
  IIndexAppRelation,
  IPaginateRequest,
  IPaginateResponse,
  IPaginationMeta,
} from './index.interface'

export abstract class BaseIndexService {
  readonly DefaultPerPage: number = 10
  readonly DefaultPage: number = 1
  readonly DefaultSort: string = 'created_at'
  readonly DefaultOrder: OrderDirectionType = 'DESC'

  abstract fetch(arg0: any, arg1: any): Promise<IPaginateResponse<IBaseEntity>>

  protected countOffset({
    page: page,
    pageSize: perPage,
  }: IPaginateRequest): number {
    page = page ?? this.DefaultPage
    perPage = perPage ?? this.DefaultPerPage

    return (page - 1) * perPage
  }

  protected getOrder(order: string): OrderDirectionEnum {
    return order == OrderDirectionEnum.Asc
      ? OrderDirectionEnum.Asc
      : OrderDirectionEnum.Desc
  }

  protected take(amount: number): number {
    return amount ?? 10
  }

  protected orderByKey(table: string, keys: string[], sort: string): string {
    return keys.includes(sort) ? `${table}.${sort}` : `${table}.updatedAt`
  }

  protected querySearch(relations: IIndexAppRelation[]): string {
    let querySearch = `CONCAT_WS(''`

    const nestedRelation = (relations: IIndexAppRelation[]) => {
      for (const relation of relations) {
        if (relation.columns) {
          for (const key of relation.columns) {
            querySearch += `, lower(${relation.name}.${key})`
          }
        }

        if (relation.relations) nestedRelation(relation.relations)
      }
    }

    nestedRelation(relations)

    return (querySearch += ') like :search')
  }

  protected mapMeta(
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

  protected async getData<T>(
    query: SelectQueryBuilder<T>,
    isExport?: boolean,
  ): Promise<[T[], number]> {
    if (isExport) return [await query.getMany(), null]
    return await query.getManyAndCount()
  }
}
