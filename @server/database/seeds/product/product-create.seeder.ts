import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntProduct } from '@server/modules/feature/product/infrastructure/product.entity'
import { IProduct } from '@server/modules/feature/product/infrastructure/product.interface'
import { EntityManager, Repository } from 'typeorm'
import { productDummies } from './product.dummy'

export const productCreateSeeder = async (): Promise<boolean> => {
  const data = productDummies
  const repo = new Repository<IProduct>(
    EntProduct,
    new EntityManager(dataSource),
  )
  const table = EntProduct.name

  const productExist = await repo
    .createQueryBuilder(table)
    .where(`${table}.key IN (:key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (productExist) return false

  await repo.createQueryBuilder(table).insert().values(data).execute()

  Logger.log(String(data.map((data) => data.key)), 'SeederCreate:Product')

  return true
}
