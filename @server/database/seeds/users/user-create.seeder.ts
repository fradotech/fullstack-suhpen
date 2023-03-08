import { Logger } from '@nestjs/common'
import { DataSourceOptions } from '@server/database/config.db'
import { EttUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { EntityManager, Repository } from 'typeorm'
import { usersDummies } from './user.dummy'

export const userCreateSeeder = async (): Promise<boolean> => {
  const data = usersDummies
  const repo = new Repository<IUser>(
    EttUser,
    new EntityManager(DataSourceOptions),
  )
  const table = EttUser.name

  const userExist = await repo
    .createQueryBuilder(table)
    .where(`${table}.email = :email`, { email: data[0].email })
    .getOne()

  if (userExist) return false

  await repo.createQueryBuilder(table).insert().values(data).execute()

  Logger.log(
    'Success run users seeders ',
    String(data.map((data) => data.email)),
  )

  return true
}
