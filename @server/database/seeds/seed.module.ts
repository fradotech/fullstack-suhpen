import { Logger } from '@nestjs/common'
import dataSource from '../data-source'
import { categoryUpdateSeeder } from './category/category-update.seeder'
import { productCreateSeeder } from './product/product-create.seeder'
import { userCreateSeeder } from './user/user-create.seeder'

export const seeders = async () => {
  await dataSource
    .initialize()
    .then(async () =>
      Logger.log('Success connect automatic seeder', 'SeederConnect'),
    )
    .catch((error) => Logger.error(error))

  await userCreateSeeder()
  await categoryUpdateSeeder()
  await productCreateSeeder()
}
