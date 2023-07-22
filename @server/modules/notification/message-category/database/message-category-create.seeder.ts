import { Logger } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { EntMessageCategory } from '../infrastructure/message-category.entity'
import { messageCategoryDummies } from './message-category.dummy'

export const messageCategoryCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = messageCategoryDummies
  const table = EntMessageCategory.name

  const messageCategoryExist = await entityManager
    .createQueryBuilder(EntMessageCategory, table)
    .where(`${table}.key IN (:...key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (messageCategoryExist) return false

  const dataCreate = entityManager.create(EntMessageCategory, data)
  await entityManager.save(dataCreate)

  Logger.log(
    String(data.map((data) => data.key)),
    'AutomaticSeeder:MessageCategoryCreate',
  )

  return true
}
