import { Logger } from '@nestjs/common'
import { EntRole } from '@server/modules/iam/role/infrastructure/role.entity'
import { Modules } from '@server/modules/modules'
import { EntityManager } from 'typeorm'
import { EntPermission } from '../../permission/infrastructure/permission.entity'
import { RoleDefaultKeyEnum } from '../common/role.enum'
import { RoleSyncRequest } from '../v1/role.request'

export const roleSyncGeneralPermissionsSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = await entityManager.find(EntRole)
  const permissions = await entityManager.find(EntPermission)
  const permissionsGeneral = await entityManager
    .createQueryBuilder(EntPermission, 'permissions')
    .andWhere(`permissions.module IN (:...module)`, {
      module: [
        Modules.Auth,
        Modules.Account,
        Modules.Attachment,
        Modules.Dashboard,
        Modules.DashboardUser,
        Modules.NotificationCategory,
        Modules.PushNotificationRead,
      ],
    })
    .getMany()

  const dataSave = data.map((data) => {
    const dataPermissions =
      data.key === RoleDefaultKeyEnum.SuperAdmin
        ? permissions
        : permissionsGeneral

    return RoleSyncRequest.dto(data, dataPermissions)
  })

  await entityManager.save(dataSave)

  Logger.log('RoleSync', 'AutomaticSeeder')

  return true
}
