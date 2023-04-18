import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntCategory } from '@server/modules/feature/category/infrastructure/category.entity'
import { ICategory } from '@server/modules/feature/category/infrastructure/category.interface'
import { EntityManager, Repository } from 'typeorm'
import { categoryDummies } from './category.dummy'

export const categoryCreateSeeder = async (): Promise<boolean> => {
  const data = categoryDummies
  const categoryRepo = new Repository<ICategory>(
    EntCategory,
    new EntityManager(dataSource),
  )
  const table = EntCategory.name

  const categoryExist = await categoryRepo
    .createQueryBuilder(table)
    .where(`${table}.key IN (:key)`, { key: data.map((data) => data.key) })
    .getOne()

  if (categoryExist) return false

  await categoryRepo.createQueryBuilder(table).insert().values(data).execute()

  Logger.log(String(data.map((data) => data.key)), 'SeederCreate:Category')

  return true
}
