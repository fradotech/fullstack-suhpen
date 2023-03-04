/**
 * Index Application
 * Used to fetch paginated data with any sort, filter and search
 */

import {
  OrderDirectionEnum,
  OrderDirectionType,
} from '@server/infrastructure/index/index.enum'
import { IBaseEntity } from '../base/base-entity.interface'
import {
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

  countOffset({ page: page, pageSize: perPage }: IPaginateRequest): number {
    page = page ?? this.DefaultPage
    perPage = perPage ?? this.DefaultPerPage

    return (page - 1) * perPage
  }

  getOrder(order: string): OrderDirectionEnum {
    return order == OrderDirectionEnum.Asc
      ? OrderDirectionEnum.Asc
      : OrderDirectionEnum.Desc
  }

  take(amount: number): number {
    return amount ?? 10
  }

  orderByKey(table: string, keys: string[], sort: string): string {
    return keys.includes(sort) ? `${table}.${sort}` : `${table}.updatedAt`
  }

  querySearch(table: string, keys: string[]): string {
    let querySearch = ''

    for (const key of keys) {
      querySearch += `lower(${table}.${key}) like :search or `
    }

    return querySearch.slice(0, -4)
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
}
