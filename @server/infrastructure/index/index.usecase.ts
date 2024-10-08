import { Exception } from '@server/common/exceptions/index.exception'
import { RoleDefaultKeyEnum } from '@server/modules/iam/role/common/role.enum'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Request } from 'express'
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm'
import { IIndexUsecaseRelation } from './index.interface'
import { IndexRequest } from './index.request'
import { BaseIndexService } from './index.service'

export abstract class BaseIndexUsecase extends BaseIndexService {
  constructor() {
    super()
  }

  protected createQueryIndex<T extends ObjectLiteral>(
    req: IndexRequest,
    name: string,
    columns: string[],
    relations: IIndexUsecaseRelation[],
    repo: Repository<T>,
    request: Request,
    isNotFilterColumnUser?: boolean,
  ): SelectQueryBuilder<T> {
    if (
      req.sortField &&
      req.sortField !== 'undefined' &&
      ![...columns, ...relations.map((data) => data.name)].includes(
        req.sortField,
      )
    ) {
      Exception.badRequest(`Field ${req.sortField} doesn't exist for sort`)
    }

    const query = repo.createQueryBuilder(name)

    const leftJoin = (
      tableName: string,
      relations: IIndexUsecaseRelation[],
    ) => {
      relations.forEach((relation) => {
        query.leftJoinAndSelect(`${tableName}.${relation.name}`, relation.name)
        relation.relations && leftJoin(relation.name, relation.relations)
      })
    }

    leftJoin(name, relations)

    if (req.search) {
      const thisTable: IIndexUsecaseRelation = { name, columns }
      query.andWhere(this.querySearch([thisTable, ...relations]), {
        search: `%${req.search.toLowerCase()}%`,
      })
    }

    if (req.startAt && req.endAt) {
      query.andWhere(
        `CAST(${name}.${
          req.dateRangeColumn || 'createdAt'
        } as DATE) BETWEEN CAST(:startAt AS DATE) AND CAST(:endAt AS DATE)`,
        { startAt: req.startAt, endAt: req.endAt },
      )
    }

    if (req.filters) {
      Object.keys(req.filters)?.forEach((column) => {
        if (!column.includes('_')) {
          if (columns.includes(column)) {
            query.andWhere(`${name}.${column} IN (:...value)`, {
              value: req.filters?.[column],
            })
          } else {
            const filterRelation = (relations: IIndexUsecaseRelation[]) => {
              relations.forEach((relation) => {
                relation.columns?.forEach((key) => {
                  if (relation.name.includes(column)) {
                    query.andWhere(`${relation.name}.${key} IN (:...value)`, {
                      value: req.filters?.[column],
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
    const user = request['user'] as IUser
    const userId = user?.id
    const isUserRelation = relations
      .map((data) => data.name)
      .find((data) => data === 'user')
    const isAdmin = user?.roles?.find((role) => {
      return role.key === RoleDefaultKeyEnum.SuperAdmin
    })

    if (!isNotFilterColumnUser && isUser && userId && !isAdmin) {
      !isUserRelation && query.leftJoinAndSelect(`${name}.user`, 'user')
      query.andWhere('user.id = :userId', { userId })
    }

    const sort = this.orderByKey(name, columns, req.sortField)
    const order = this.getOrder(req.sortOrder)

    query.cache(String([userId, query.getQuery()]))
    query.orderBy(sort, order)
    query.take(this.take(req.pageSize))
    query.skip(this.countOffset(req))

    return query
  }
}
