import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntCategory } from '@server/modules/feature/category/infrastructure/category.entity'
import { ICategory } from '@server/modules/feature/category/infrastructure/category.interface'
import { EntProduct } from '@server/modules/feature/product/infrastructure/product.entity'
import { IProduct } from '@server/modules/feature/product/infrastructure/product.interface'
import { EntityManager, Repository } from 'typeorm'
import { productDummies } from './product.dummy'

export const productCreateSeeder = async (): Promise<boolean> => {
  const data = productDummies
  const productRepo = new Repository<IProduct>(
    EntProduct,
    new EntityManager(dataSource),
  )
  const table = EntProduct.name

  const productExist = await productRepo
    .createQueryBuilder(table)
    .where(`${table}.key IN (:key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (productExist) return false

  const categoryRepo = new Repository<ICategory>(
    EntCategory,
    new EntityManager(dataSource),
  )

  const categories = await categoryRepo.find()
  const products = data as unknown as IProduct[]

  for (let i = 0; i < products.length; i++) {
    const iCategories = () => Math.floor(Math.random() * categories.length)
    const getCategory = () => categories[iCategories()]
    const randomCategories = [getCategory(), getCategory()]

    products[i].marginPrice = products[i].sellPrice - products[i].buyPrice
    products[i].categories = [...new Set(randomCategories)]
  }

  await productRepo.save(data)

  Logger.log(String(data.map((data) => data.key)), 'SeederCreate:Product')

  return true
}
