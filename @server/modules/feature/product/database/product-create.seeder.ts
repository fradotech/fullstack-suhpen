import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntCategory } from '@server/modules/feature/category/infrastructure/category.entity'
import { EntProduct } from '@server/modules/feature/product/infrastructure/product.entity'
import { EntityManager } from 'typeorm'
import { ProductCreateRequest } from '../infrastructure/product.request'
import { productDummies } from './product.dummy'

export const productCreateSeeder = async (): Promise<boolean> => {
  const entityManager = new EntityManager(dataSource)
  const data = ProductCreateRequest.dtos(productDummies)
  const table = EntProduct.name

  const productExist = await entityManager
    .createQueryBuilder(EntProduct, table)
    .where(`${table}.key IN (:...key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (productExist) return false

  const categories = await entityManager.find(EntCategory)
  const products = data

  for (let i = 0; i < products.length; i++) {
    const iCategories = () => Math.floor(Math.random() * categories.length)
    const getCategory = () => categories[iCategories()]
    const randomCategories = [getCategory(), getCategory()]

    products[i].categories = [...new Set(randomCategories)]
  }

  const dataCreate = entityManager.create(EntProduct, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.key)), 'SeederCreate:Product')

  return true
}
