import { Logger } from '@nestjs/common'
import dataSource from '../data-source'
import { userCreateSeeder } from './users/user-create.seeder'

export const seeders = async () => {
  await dataSource
    .initialize()
    .then(async () => Logger.log('Success connect seeder', 'Automatic Seeder'))
    .catch((error) => Logger.error(error))

  await Promise.all([userCreateSeeder()])
}
