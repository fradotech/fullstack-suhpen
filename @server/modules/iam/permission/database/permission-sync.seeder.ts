import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntPermission } from '@server/modules/iam/permission/infrastructure/permission.entity'
import { EntityManager } from 'typeorm'
import { PermissionCreateRequest } from '../infrastructure/permission.request'

export const permissionSyncSeeder = async (): Promise<boolean> => {
  const data = []
  const permissions = data
  const entityManager = new EntityManager(dataSource)
  const table = EntPermission.name

  const permissionsDelete = await entityManager.find(EntPermission)
  const permissionsCreate: EntPermission[] = []

  for (const data of permissions) {
    const permission = PermissionCreateRequest.dto(data)

    const exist = await entityManager
      .createQueryBuilder(EntPermission, table)
      .andWhere(`${table}.key = :key`, {
        key: permission.key,
      })
      .getOne()

    permission.id = exist?.id

    permissionsDelete.find((permission) => {
      if (permission?.key === permission.key) {
        permissionsDelete.splice(permissionsDelete.indexOf(permission), 1)
      }
    })

    permissionsCreate.push(permission)
  }

  await entityManager
    .createQueryBuilder(EntPermission, table)
    .insert()
    .values(data)
    .execute()

  await entityManager.remove(permissionsDelete)

  Logger.log(String(data.map((data) => data.email)), 'SeederCreate:Permission')

  return true
}
