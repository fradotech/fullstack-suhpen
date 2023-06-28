import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntCategory } from '@server/modules/feature/category/infrastructure/category.entity'
import { EntProduct } from '@server/modules/feature/product/infrastructure/product.entity'
import { IProduct } from '@server/modules/feature/product/infrastructure/product.interface'
import { EntityManager } from 'typeorm'
import { productDummies } from './product.dummy'

export const productCreateSeeder = async (): Promise<boolean> => {
  const data = productDummies
  const entityManager = new EntityManager(dataSource)
  const table = EntProduct.name

  const productExist = await entityManager
    .createQueryBuilder(EntProduct, table)
    .where(`${table}.key IN (:key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (productExist) return false

  const categories = await entityManager.find(EntCategory)
  const products = data as unknown as IProduct[]

  for (let i = 0; i < products.length; i++) {
    const iCategories = () => Math.floor(Math.random() * categories.length)
    const getCategory = () => categories[iCategories()]
    const randomCategories = [getCategory(), getCategory()]

    products[i].categories = [...new Set(randomCategories)]
  }

  await entityManager
    .createQueryBuilder(EntProduct, table)
    .insert()
    .values(data)
    .execute()

  Logger.log(String(data.map((data) => data.key)), 'SeederCreate:Product')

  return true
}
