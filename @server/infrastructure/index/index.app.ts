import {
  OrderDirectionEnum,
  OrderDirectionType,
} from '@server/infrastructure/index/index.enum'
import { ERole } from 'client/Modules/Iam/Role/Role.enum'
import { Request } from 'express'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IBaseEntity } from '../base/base-entity.interface'
import {
  IIndexAppRelation,
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

  private querySearch(relations: IIndexAppRelation[]): string {
    let querySearch = `CONCAT_WS(''`

    for (const relation of relations) {
      if (relation.columns) {
        for (const key of relation.columns) {
          querySearch += `, lower(${relation.table}.${key})`
        }
      }
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

  // --- Create Index Query --- \\

  createQueryIndex<T>(
    req: IndexRequest,
    query: SelectQueryBuilder<T>,
    tableName: string,
    tableColumns: string[],
    relations: IIndexAppRelation[],
    repo: Repository<T>,
    request: Request,
  ): SelectQueryBuilder<T> {
    const leftJoin = (relations: IIndexAppRelation[]) => {
      relations.forEach((relation) => {
        query.leftJoinAndSelect(
          `${tableName}.${relation.table}`,
          relation.table,
        )
        relation.relations && leftJoin(relation.relations)
      })
    }

    leftJoin(relations)

    if (req.search) {
      const thisTable: IIndexAppRelation = {
        table: tableName,
        columns: tableColumns,
      }
      query.andWhere(this.querySearch([thisTable, ...relations]), {
        search: `%${req.search.toLowerCase()}%`,
      })
    }

    if (req.startAt && req.endAt) {
      query.andWhere(
        `CAST(${tableName}.${
          req.dateRangeColumn || 'createdAt'
        } as DATE) BETWEEN CAST(:startAt AS DATE) AND CAST(:endAt AS DATE)`,
        { startAt: req.startAt, endAt: req.endAt },
      )
    }

    if (req.filters) {
      Object.keys(req.filters)?.forEach((column) => {
        if (!column.includes('_')) {
          if (tableColumns.includes(column)) {
            query.andWhere(`${tableName}.${column} IN (:value)`, {
              value: req.filters[column],
            })
          } else {
            relations.forEach((relation) => {
              relation.columns.forEach((key) => {
                query.andWhere(`${relation.table}.${key} IN (:value)`, {
                  value: req.filters[column],
                })
              })
            })
          }
        }
      })
    }

    const isUser = repo.metadata.propertiesMap['user']
    const userId = request['user']?.['id']
    const isUserRelation = relations
      .map((data) => data.table)
      .find((data) => data == 'user')
    const isAdmin = [ERole.SuperAdmin, ERole.Admin].includes(
      request['user']?.['role'],
    )

    if (isUser && userId && !isAdmin) {
      !isUserRelation && query.leftJoinAndSelect(`${tableName}.user`, 'user')
      query.andWhere('user.id = :userId', { userId })
    }

    const sort = this.orderByKey(tableName, tableColumns, req.sortField)
    const order = this.getOrder(req.sortOrder)
    query.orderBy(sort, order)
    query.take(this.take(req.pageSize))
    query.skip(this.countOffset(req))

    return query
  }
}
