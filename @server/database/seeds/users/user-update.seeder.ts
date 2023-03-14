import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntUser } from '@server/modules/iam/user/infrastructure/user.entity'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { EntityManager, Repository } from 'typeorm'
import { UserCreateRequest } from '../../../modules/iam/user/infrastructure/user.request'
import { usersDummies } from './user.dummy'

export const userUpdateSeeder = async (): Promise<boolean> => {
  const data = usersDummies
  const repo = new Repository<IUser>(EntUser, new EntityManager(dataSource))

  data.forEach(async (data) => {
    const dataExist = await repo.findOne({ where: { email: data.email } })
    const dataCreate = new UserCreateRequest()
    Object.assign(dataCreate, data)

    dataExist && (dataCreate.id = dataExist.id)
    await repo.save(dataCreate)
  })

  Logger.log(
    'Success run users seeders ',
    String(data.map((data) => data.email)),
  )

  return true
}
