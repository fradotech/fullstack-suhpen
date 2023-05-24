import { ERole } from 'client/Modules/Iam/Role/Role.enum'
import { Request } from 'express'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IIndexAppRelation } from './index.interface'
import { IndexRequest } from './index.request'
import { BaseIndexService } from './index.service'

export abstract class BaseIndexApp extends BaseIndexService {
  constructor() {
    super()
  }

  createQueryIndex<T>(
    req: IndexRequest,
    query: SelectQueryBuilder<T>,
    tableName: string,
    tableColumns: string[],
    relations: IIndexAppRelation[],
    repo: Repository<T>,
    request: Request,
  ): SelectQueryBuilder<T> {
    const leftJoin = (tableName: string, relations: IIndexAppRelation[]) => {
      relations.forEach((relation) => {
        query.leftJoinAndSelect(`${tableName}.${relation.name}`, relation.name)
        relation.relations && leftJoin(relation.name, relation.relations)
      })
    }

    leftJoin(tableName, relations)

    if (req.search) {
      const thisTable: IIndexAppRelation = {
        name: tableName,
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
            const filterRelation = (relations: IIndexAppRelation[]) => {
              relations.forEach((relation) => {
                relation.columns?.forEach((key) => {
                  if (relation.name.includes(column)) {
                    query.andWhere(`${relation.name}.${key} IN (:value)`, {
                      value: req.filters[column],
                    })
                  }
                  relation.relations && filterRelation(relation.relations)
                })
              })
            }

            filterRelation(relations)
          }
        }
      })
    }

    const isUser = repo.metadata.propertiesMap['user']
    const userId = request['user']?.['id']
    const isUserRelation = relations
      .map((data) => data.name)
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
