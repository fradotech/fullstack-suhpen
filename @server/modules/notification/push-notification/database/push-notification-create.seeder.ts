import { Logger } from '@nestjs/common'
import { RoleDefaultKeyEnum } from '@server/modules/iam/role/common/role.enum'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { EntityManager, In } from 'typeorm'
import { NotificationCategoryDefaultKeyEnum } from '../../notification-category/common/notification-category.enum'
import { EntNotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { EntPushNotification } from '../infrastructure/push-notification.entity'
import { pushNotificationDummies } from './push-notification.dummy'

export const pushNotificationCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = pushNotificationDummies

  const notificationNotificationExist = await entityManager.find(
    EntPushNotification,
  )

  if (notificationNotificationExist.length > 0) return false

  const superAdmin = await entityManager.findOne(EntUser, {
    where: { roles: In[RoleDefaultKeyEnum.SuperAdmin] },
  })

  const categorySystem = await entityManager.findOne(EntNotificationCategory, {
    where: { key: NotificationCategoryDefaultKeyEnum.System },
  })

  data.forEach((data) => {
    superAdmin && (data.user = superAdmin)
    categorySystem && (data.category = categorySystem)
  })

  const dataCreate = entityManager.create(EntPushNotification, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.title)), 'AutomaticSeeder')

  return true
}
