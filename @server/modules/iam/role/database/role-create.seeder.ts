import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntityManager } from 'typeorm'
import { EntRole } from '../infrastructure/role.entity'
import { roleDummies } from './role.dummy'

export const roleCreateSeeder = async (): Promise<boolean> => {
  const entityManager = new EntityManager(dataSource)
  const data = roleDummies
  const table = EntRole.name

  const roleExist = await entityManager
    .createQueryBuilder(EntRole, table)
    .where(`${table}.key IN (:key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (roleExist) return false

  const dataCreate = entityManager.create(EntRole, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.key)), 'SeederCreate:Role')

  return true
}
