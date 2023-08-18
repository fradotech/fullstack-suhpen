import { Logger } from '@nestjs/common'
import { RoleDefaultKeyEnum } from '@server/modules/iam/role/common/role.enum'
import { IamUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { EntityManager, In } from 'typeorm'
import { NotificationCategoryDefaultKeyEnum } from '../../notification-category/common/notification-category.enum'
import { NotificationCategory } from '../../notification-category/infrastructure/notification-category.entity'
import { NotificationPush } from '../infrastructure/notification-push.entity'
import { notificationPushDummies } from './notification-push.dummy'

export const notificationPushCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = notificationPushDummies

  const notificationNotificationExist = await entityManager.find(
    NotificationPush,
  )

  if (notificationNotificationExist.length > 0) return false

  const superAdmin = await entityManager.findOne(IamUser, {
    where: { roles: In[RoleDefaultKeyEnum.SuperAdmin] },
  })

  const categorySystem = await entityManager.findOne(NotificationCategory, {
    where: { key: NotificationCategoryDefaultKeyEnum.System },
  })

  data.forEach((data) => {
    superAdmin && (data.user = superAdmin)
    categorySystem && (data.category = categorySystem)
  })

  const dataCreate = entityManager.create(NotificationPush, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.title)), 'AutomaticSeeder')

  return true
}
