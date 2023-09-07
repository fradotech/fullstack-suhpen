import { Logger } from '@nestjs/common'
import { NestApplication } from '@nestjs/core'
import { IamPermission } from '@server/modules/iam/permission/infrastructure/permission.entity'
import { EntityManager } from 'typeorm'
import { PermissionService } from '../infrastructure/permission.service'
import { PermissionCreateRequest } from '../v1/permission.request'
import { permissionDummies } from './permission-sync-additional.dummy'

export const permissionSyncSeeder = async (
  entityManager: EntityManager,
  app: NestApplication,
): Promise<boolean> => {
  const data = [...PermissionService.findFromApp(app), ...permissionDummies]
  const permissionsDelete = await entityManager.find(IamPermission)
  const permissionsSave: IamPermission[] = []

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

  Logger.log('PermissionSync', 'AutomaticSeeder')

  return true
}
