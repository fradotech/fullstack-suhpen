import { Logger } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { NotificationCategory } from '../infrastructure/notification-category.entity'
import { notificationCategoryDummies } from './notification-category.dummy'

export const notificationCategoryCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = notificationCategoryDummies
  const table = NotificationCategory.name

  const notificationNotificationExist = await entityManager
    .createQueryBuilder(NotificationCategory, table)
    .where(`${table}.key IN (:...key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (notificationNotificationExist) return false

  const dataCreate = entityManager.create(NotificationCategory, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.key)), 'AutomaticSeeder')

  return true
}
