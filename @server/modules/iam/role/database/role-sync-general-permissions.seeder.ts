import { Logger } from '@nestjs/common'
import { EntRole } from '@server/modules/iam/role/infrastructure/role.entity'
import { Modules } from '@server/modules/modules'
import { EntityManager } from 'typeorm'
import { EntPermission } from '../../permission/infrastructure/permission.entity'
import { RoleSyncRequest } from '../infrastructure/role.request'
import { RoleDefaultSuperAdminKey } from './role.dummy'

export const roleSyncGeneralPermissionsSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = await entityManager.find(EntRole)
  const rolesDelete = await entityManager.find(EntRole)
  const rolesSave: EntRole[] = []

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
      ],
    })
    .getMany()

  data.forEach((data) => {
    const dataPermissions =
      data.key === RoleDefaultSuperAdminKey ? permissions : permissionsGeneral

    const role = RoleSyncRequest.dto(data, dataPermissions)

    const exist = rolesDelete.find((data) => {
      if (data?.key !== role?.key) return null
      rolesDelete.splice(rolesDelete.indexOf(data), 1)
      return data
    })

    exist?.id && (role.id = exist.id)
    rolesSave.push(role)
  })

  await Promise.all([
    entityManager.save(rolesSave),
    entityManager.remove(rolesDelete),
  ])

  Logger.log('RoleSync', 'AutomaticSeeder')

  return true
}
