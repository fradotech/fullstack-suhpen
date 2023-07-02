import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntCategory } from '@server/modules/feature/category/infrastructure/category.entity'
import { EntityManager } from 'typeorm'
import { CategoryCreateRequest } from '../infrastructure/category.request'
import { categoryDummies } from './category.dummy'

export const categoryCreateSeeder = async (): Promise<boolean> => {
  const entityManager = new EntityManager(dataSource)
  const data = CategoryCreateRequest.dtos(categoryDummies)
  const table = EntCategory.name

  const categoryExist = await entityManager
    .createQueryBuilder(EntCategory, table)
    .where(`${table}.key IN (:key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (categoryExist) return false

  const dataCreate = entityManager.create(EntCategory, data)
  await entityManager.save(dataCreate)

  Logger.log(String(data.map((data) => data.key)), 'SeederCreate:Category')

  return true
}
