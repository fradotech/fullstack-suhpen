import { InjectRepository } from '@nestjs/typeorm'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { IPaginateResponse } from '../../../../infrastructure/index/index.interface'
import { BaseIndexService } from '../../../../infrastructure/index/index.service'
import { UserIndexRequest } from './user-index.request'
import { EttUser } from './user.entity'

const tableName = 'user'
const tableKeys = ['name', 'email', 'role', 'phoneNumber', 'createdAt']

export class UserIndexApp extends BaseIndexService {
  constructor(
    @InjectRepository(EttUser)
    private readonly userRepo: Repository<IUser>,
  ) {
    super()
  }

  additionalQuery(
    query: SelectQueryBuilder<IUser>,
    req: UserIndexRequest,
  ): SelectQueryBuilder<IUser> {
    req
    return query
  }

  async fetch(req: UserIndexRequest): Promise<IPaginateResponse<IUser>> {
    const query = this.additionalQuery(
      this.userRepo.createQueryBuilder(tableName),
      req,
    )

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
      Object.keys(req.filters).forEach((filterField) => {
        ;(req.filters[filterField] as string[]).forEach((filterValue) => {
          query.andWhere(`${tableName}.${filterField} = :filterValue`, {
            filterValue,
          })
        })
      })
    }

    const sort = this.orderByKey(tableName, tableKeys, req.sortField)
    const order = this.getOrder(req.sortOrder)
    query.orderBy(sort, order)
    query.take(this.take(req.pageSize))
    query.skip(this.countOffset(req))

    const [data, count] = await query.getManyAndCount()

    return { data, meta: this.mapMeta(count, req) }
  }
}
