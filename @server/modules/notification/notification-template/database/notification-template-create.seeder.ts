import { Logger } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { NotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { NotificationTemplate } from '../infrastructure/notification-template.entity'
import { notificationTemplateDummies } from './notification-template.dummy'

export const notificationTemplateCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = notificationTemplateDummies
  const table = NotificationTemplate.name

  const notificationCategories = await entityManager.find(NotificationCategory)

  for (let i = 0; i < data.length; i++) {
    data[i].category = notificationCategories.find((category) => {
      return data[i].categoryKey === category.key
    })
  }

  const notificationNotificationExist = await entityManager
    .createQueryBuilder(NotificationTemplate, table)
    .where(`${table}.title IN (:...title)`, {
      title: data.map((data) => data.title),
    })
    .getOne()

  if (notificationNotificationExist) return false

  const dataCreate = entityManager.create(NotificationTemplate, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.title)), 'AutomaticSeeder')

  return true
}
