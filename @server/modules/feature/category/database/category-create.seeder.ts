import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntCategory } from '@server/modules/feature/category/infrastructure/category.entity'
import { EntityManager } from 'typeorm'
import { categoryDummies } from './category.dummy'

export const categoryCreateSeeder = async (): Promise<boolean> => {
  const data = categoryDummies
  const entityManager = new EntityManager(dataSource)
  const table = EntCategory.name

  const categoryExist = await entityManager
    .createQueryBuilder(EntCategory, table)
    .where(`${table}.key IN (:key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (categoryExist) return false

  await entityManager
    .createQueryBuilder(EntCategory, table)
    .insert()
    .values(data)
    .execute()

  Logger.log(String(data.map((data) => data.key)), 'SeederCreate:Category')

  return true
}
