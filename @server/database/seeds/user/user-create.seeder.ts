import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { EntityManager, Repository } from 'typeorm'
import { userDummies } from './user.dummy'

export const userCreateSeeder = async (): Promise<boolean> => {
  const data = userDummies
  const repo = new Repository<IUser>(EntUser, new EntityManager(dataSource))
  const table = EntUser.name

  const userExist = await repo
    .createQueryBuilder(table)
    .where(`${table}.email IN (:email)`, {
      email: data.map((data) => data.email),
    })
    .getOne()

  if (userExist) return false

  await repo.createQueryBuilder(table).insert().values(data).execute()

  Logger.log(
    'Success run users seeders ',
    String(data.map((data) => data.email)),
  )

  return true
}
