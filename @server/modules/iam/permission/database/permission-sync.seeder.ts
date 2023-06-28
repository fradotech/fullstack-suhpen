import { Logger } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import dataSource from '@server/database/data-source'
import { EntPermission } from '@server/modules/iam/permission/infrastructure/permission.entity'
import { EntityManager } from 'typeorm'
import { PermissionCreateRequest } from '../infrastructure/permission.request'
import { PermissionService } from '../infrastructure/permission.service'

export const permissionSyncSeeder = async (
  app: NestExpressApplication,
): Promise<boolean> => {
  const data = PermissionService.findFromApp(app)
  const entityManager = new EntityManager(dataSource)

  const permissionsDelete = await entityManager.find(EntPermission)
  const permissionsCreate: EntPermission[] = []

  data.forEach((data) => {
    const permission = PermissionCreateRequest.dto(data)

    const exist = permissionsDelete.find((data) => {
      if (data?.key !== permission?.key) return null
      permissionsDelete.splice(permissionsDelete.indexOf(data), 1)
      return data
    })

    permission.id = exist?.id
    permissionsCreate.push(permission)
  })

  await Promise.all([
    entityManager.save(permissionsCreate),
    entityManager.remove(permissionsDelete),
  ])

  Logger.log('', 'SeederSync:Permission')

  return true
}
