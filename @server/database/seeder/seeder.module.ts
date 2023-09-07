import { Logger } from '@nestjs/common'
import { NestApplication } from '@nestjs/core'
import { permissionSyncSeeder } from '@server/modules/iam/permission/database/permission-sync.seeder'
import { roleCreateSeeder } from '@server/modules/iam/role/database/role-create.seeder'
import { roleSyncGeneralPermissionsSeeder } from '@server/modules/iam/role/database/role-sync-general-permissions.seeder'
import { notificationCategoryCreateSeeder } from '@server/modules/notification/notification-category/database/notification-category-create.seeder'
import { notificationPushCreateSeeder } from '@server/modules/notification/notification-push/database/notification-push-create.seeder'
import { notificationTemplateCreateSeeder } from '@server/modules/notification/notification-template/database/notification-template-create.seeder'
import { cityCreateSeeder } from '@server/modules/region/city/database/city-create.seeder'
import { districtCreateSeeder } from '@server/modules/region/district/database/district-create.seeder'
import { provinceCreateSeeder } from '@server/modules/region/province/database/province-create.seeder'
import { EntityManager } from 'typeorm'
import { userCreateSeeder } from '../../modules/iam/user/database/user-create.seeder'
import dataSource from '../data-source'

export class SeederMoodule {
  static async forRoot(app: NestApplication) {
    await dataSource
      .initialize()
      .then(async () => {
        Logger.log('Success connect automatic seeder', 'AutomaticSeeder')
      })
      .catch((error) => Logger.error(error))

    const entityManager = new EntityManager(dataSource)

    // --- Region --- \\

    await provinceCreateSeeder(entityManager)
    await cityCreateSeeder(entityManager)
    await districtCreateSeeder(entityManager)

    // --- Iam --- \\

    await permissionSyncSeeder(entityManager, app)
    await roleCreateSeeder(entityManager)
    await roleSyncGeneralPermissionsSeeder(entityManager)
    await userCreateSeeder(entityManager)

    // --- Notification --- \\

    await notificationCategoryCreateSeeder(entityManager)
    await notificationPushCreateSeeder(entityManager)
    await notificationTemplateCreateSeeder(entityManager)

    return { module: SeederMoodule }
  }
}
