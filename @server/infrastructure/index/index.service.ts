import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import { IBaseEntity } from '../base/base-entity.interface'
import {
  IIndexUsecaseRelation,
  IPaginateRequest,
  IPaginateResponse,
  IPaginationMeta,
  IndexSortOderEnum,
} from './index.interface'

export abstract class BaseIndexService {
  readonly DefaultPerPage: number = 10
  readonly DefaultPage: number = 1
  readonly DefaultOrder = 'DESC'

  abstract fetch(arg0: any, arg1: any): Promise<IPaginateResponse<IBaseEntity>>

  protected countOffset({
    page: page,
    pageSize: perPage,
  }: IPaginateRequest): number {
    page = page ?? this.DefaultPage
    perPage = perPage ?? this.DefaultPerPage

    return (page - 1) * perPage
  }

  protected getOrder(order?: string): IndexSortOderEnum {
    return order === 'ASC' ? IndexSortOderEnum.Asc : IndexSortOderEnum.Desc
  }

  protected take(amount?: number): number {
    return amount ?? 10
  }

  protected orderByKey(table: string, keys: string[], sort?: string): string {
    return keys.includes(sort || 'updatedAt')
      ? `${table}.${sort}`
      : `${table}.updatedAt`
  }

  protected querySearch(relations: IIndexUsecaseRelation[]): string {
    // CONTINUE: add more nonLowerStrings
    const nonLowerStrings = ['id', 'At', 'isActive', 'Price', 'stock']
    const nonLowerColumns: string[] = []

    let querySearch = `CONCAT_WS(''`

    const nestedRelation = (relations: IIndexUsecaseRelation[]) => {
      for (const relation of relations) {
        if (relation.columns) {
          for (const key of relation.columns) {
            nonLowerStrings.forEach((data) => {
              key.includes(data) && nonLowerColumns.push(key)
            })

            if (!nonLowerColumns.includes(key)) {
              querySearch += `, lower(${relation.name}.${key})`
            } else {
              querySearch += `, ${relation.name}.${key}`
            }
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

  protected async getData<T extends ObjectLiteral>(
    query: SelectQueryBuilder<T>,
    isExport?: boolean,
  ): Promise<[T[], number]> {
    if (isExport) return [await query.getMany(), 0]
    return await query.getManyAndCount()
  }
}
