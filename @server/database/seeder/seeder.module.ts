import { Injectable, Logger } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { permissionSyncSeeder } from '@server/modules/iam/permission/database/permission-sync.seeder'
import { roleCreateSeeder } from '@server/modules/iam/role/database/role-create.seeder'
import { roleSyncGeneralPermissionsSeeder } from '@server/modules/iam/role/database/role-sync-general-permissions.seeder'
import { notificationCategoryCreateSeeder } from '@server/modules/notification/notification-category/database/notification-category-create.seeder'
import { pushNotificationCreateSeeder } from '@server/modules/notification/push-notification/database/push-notification-create.seeder'
import { EntityManager } from 'typeorm'
import { userCreateSeeder } from '../../modules/iam/user/database/user-create.seeder'
import dataSource from '../data-source'

@Injectable()
export class SeederMoodule {
  static async forRoot(app: NestExpressApplication) {
    await dataSource
      .initialize()
      .then(async () => {
        Logger.log('Success connect automatic seeder', 'AutomaticSeeder')
      })
      .catch((error) => Logger.error(error))

    const entityManager = new EntityManager(dataSource)

    // --- Iam --- \\

    await permissionSyncSeeder(entityManager, app)
    await roleCreateSeeder(entityManager)
    await roleSyncGeneralPermissionsSeeder(entityManager)
    await userCreateSeeder(entityManager)

    // --- Notification --- \\

    await notificationCategoryCreateSeeder(entityManager)
    await pushNotificationCreateSeeder(entityManager)

    return { module: SeederMoodule }
  }
}
