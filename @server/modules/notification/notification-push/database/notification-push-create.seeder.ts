import { Logger } from '@nestjs/common'
import { RoleDefaultKeyEnum } from '@server/modules/iam/role/common/role.enum'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { EntityManager, In } from 'typeorm'
import { NotificationCategoryDefaultKeyEnum } from '../../notification-category/common/notification-category.enum'
import { EntNotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { EntNotificationPush } from '../infrastructure/notification-push.entity'
import { notificationPushDummies } from './notification-push.dummy'

export const notificationPushCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = notificationPushDummies

  const notificationNotificationExist = await entityManager.find(
    EntNotificationPush,
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

  const dataCreate = entityManager.create(EntNotificationPush, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.title)), 'AutomaticSeeder')

  return true
}
