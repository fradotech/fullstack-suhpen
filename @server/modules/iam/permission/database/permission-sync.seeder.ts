import { Logger } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { EntPermission } from '@server/modules/iam/permission/infrastructure/permission.entity'
import { EntityManager } from 'typeorm'
import { PermissionCreateRequest } from '../infrastructure/permission.request'
import { PermissionService } from '../infrastructure/permission.service'
import { permissionDummies } from './permission-sync-additional.dummy'

export const permissionSyncSeeder = async (
  entityManager: EntityManager,
  app: NestExpressApplication,
): Promise<boolean> => {
  const data = [...PermissionService.findFromApp(app), ...permissionDummies]
  const permissionsDelete = await entityManager.find(EntPermission)
  const permissionsSave: EntPermission[] = []

  data.forEach((data) => {
    const permission = PermissionCreateRequest.dto(data)

    const exist = permissionsDelete.find((data) => {
      if (data?.key !== permission?.key) return null
      permissionsDelete.splice(permissionsDelete.indexOf(data), 1)
      return data
    })

    exist?.id && (permission.id = exist.id)
    permissionsSave.push(permission)
  })

  await Promise.all([
    entityManager.save(permissionsSave),
    entityManager.remove(permissionsDelete),
  ])

  Logger.log('', 'AutomaticSeeder:PermissionSync')

  return true
}
