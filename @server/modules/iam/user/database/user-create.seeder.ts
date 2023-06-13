import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { EntityManager, Repository } from 'typeorm'
import { userDummies } from './user.dummy'

export const userCreateSeeder = async (): Promise<boolean> => {
  const data = userDummies
  const entityManager = new EntityManager(dataSource)
  const userRepo = new Repository<IUser>(EntUser, entityManager)
  const table = EntUser.name

  const userExist = await userRepo
    .createQueryBuilder(table)
    .where(`${table}.email IN (:email)`, {
      email: data.map((data) => data.email),
    })
    .getOne()

  if (userExist) return false

  await userRepo.createQueryBuilder(table).insert().values(data).execute()

  Logger.log(String(data.map((data) => data.email)), 'SeederCreate:User')

  return true
}
