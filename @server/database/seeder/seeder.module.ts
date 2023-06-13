import { Injectable, Logger } from '@nestjs/common'
import { categoryCreateSeeder } from '../../modules/feature/category/database/category-create.seeder'
import { inventoryCreateSeeder } from '../../modules/feature/inventory/database/inventoy-create.seeder'
import { productCreateSeeder } from '../../modules/feature/product/database/product-create.seeder'
import { userCreateSeeder } from '../../modules/iam/user/database/user-create.seeder'
import dataSource from '../data-source'

@Injectable()
export class SeederMoodule {
  static async forRoot() {
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

    return { module: SeederMoodule }
  }
}
