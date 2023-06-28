import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { EntityManager } from 'typeorm'
import { userDummies } from './user.dummy'

export const userCreateSeeder = async (): Promise<boolean> => {
  const data = userDummies
  const entityManager = new EntityManager(dataSource)
  const table = EntUser.name

  const userExist = await entityManager
    .createQueryBuilder(EntUser, table)
    .where(`${table}.email IN (:email)`, {
      email: data.map((data) => data.email),
    })
    .getOne()

  if (userExist) return false

  const dataCreate = entityManager.create(EntUser, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.email)), 'SeederCreate:User')

  return true
}
