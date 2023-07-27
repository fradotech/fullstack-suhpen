import { Logger } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { EntNotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { EntNotificationTemplate } from '../infrastructure/notification-template.entity'
import { notificationTemplateDummies } from './notification-template.dummy'

export const notificationTemplateCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = notificationTemplateDummies
  const table = EntNotificationTemplate.name

  const notificationCategories = await entityManager.find(
    EntNotificationCategory,
  )

  for (let i = 0; i < data.length; i++) {
    data[i].category = notificationCategories.find((category) => {
      return data[i].categoryKey === category.key
    })
  }

  const notificationNotificationExist = await entityManager
    .createQueryBuilder(EntNotificationTemplate, table)
    .where(`${table}.title IN (:...title)`, {
      title: data.map((data) => data.title),
    })
    .getOne()

  if (notificationNotificationExist) return false

  const dataCreate = entityManager.create(EntNotificationTemplate, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.title)), 'AutomaticSeeder')

  return true
}
