import { Logger } from '@nestjs/common'
import dataSource from '../data-source'
import { categoryCreateSeeder } from './category/category-create.seeder'
import { inventoryCreateSeeder } from './inventoy/inventoy-create.seeder'
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
  await categoryCreateSeeder()
  await productCreateSeeder()
  await inventoryCreateSeeder()
}
