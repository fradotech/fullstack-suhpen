import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntRole } from '@server/modules/iam/role/infrastructure/role.entity'
import { Modules } from '@server/modules/modules'
import { EntityManager } from 'typeorm'
import { EntPermission } from '../../permission/infrastructure/permission.entity'
import { RoleSyncRequest } from '../infrastructure/role.request'

export const roleSyncGeneralPermissionsSeeder = async (): Promise<boolean> => {
  const entityManager = new EntityManager(dataSource)
  const data = await entityManager.find(EntRole)

  const rolesDelete = await entityManager.find(EntRole)
  const rolesSave: EntRole[] = []

  const permissionsAuth = await entityManager.find(EntPermission, {
    where: { module: Modules.Auth },
  })

  data.forEach((data) => {
    const role = RoleSyncRequest.dto(data, permissionsAuth)

    const exist = rolesDelete.find((data) => {
      if (data?.key !== role?.key) return null
      rolesDelete.splice(rolesDelete.indexOf(data), 1)
      return data
    })

    role.id = exist?.id
    rolesSave.push(role)
  })

  await Promise.all([
    entityManager.save(rolesSave),
    entityManager.remove(rolesDelete),
  ])

  Logger.log('', 'SeederSync:Role')

  return true
}
