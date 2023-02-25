import { Logger } from '@nestjs/common'
import { DataSourceOptions } from '../config.db'
import { userCreateSeeder } from './users/user-create.seeder'

export const seeders = async () => {
  await DataSourceOptions.initialize()
    .then(async () => Logger.log('Success connect seeder', 'Automatic Seeder'))
    .catch((error) => Logger.error(error))

  await Promise.all([userCreateSeeder()])
}
