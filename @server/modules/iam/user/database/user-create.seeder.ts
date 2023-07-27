import { Logger } from '@nestjs/common'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { EntityManager } from 'typeorm'
import { RoleDefaultKeyEnum } from '../../role/common/role.enum'
import { EntRole } from '../../role/infrastructure/role.entity'
import { UserCreateRequest } from '../v1/user.request'
import { userDummies } from './user.dummy'

export const userCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const data = UserCreateRequest.dtos(userDummies as UserCreateRequest[])
  const table = EntUser.name

  const userExist = await entityManager
    .createQueryBuilder(EntUser, table)
    .where(`${table}.email IN (:...email)`, {
      email: data.map((data) => data.email),
    })
    .getOne()

  if (userExist) return false

  const roles = await entityManager.find(EntRole)

  for (let i = 0; i < data.length; i++) {
    const iRoles = () => Math.floor(Math.random() * roles.length)
    const getRole = () => roles[iRoles()]
    const randomRoles = [getRole(), getRole()]

    data[i].roles = []

    if (data[i]['roleKey'] === RoleDefaultKeyEnum.SuperAdmin) {
      const roleAdmin = roles.find((role) => {
        return role.key === RoleDefaultKeyEnum.SuperAdmin
      })

      roleAdmin && data[i].roles.push(roleAdmin)
    } else {
      data[i].roles = [...new Set(randomRoles)]
    }
  }

  const dataCreate = entityManager.create(EntUser, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.email)), 'AutomaticSeeder')

  return true
}
