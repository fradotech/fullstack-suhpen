import { Logger } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { IamRole } from '../infrastructure/role.entity'
import { roleDummies } from './role.dummy'

export const roleCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = roleDummies
  const table = IamRole.name

  const roleExist = await entityManager
    .createQueryBuilder(IamRole, table)
    .where(`${table}.key IN (:...key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (roleExist) return false

  const dataCreate = entityManager.create(IamRole, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.key)), 'AutomaticSeeder')

  return true
}
