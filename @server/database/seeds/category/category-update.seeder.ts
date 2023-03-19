import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntCategory } from '@server/modules/feature/category/infrastructure/category.entity'
import { ICategory } from '@server/modules/feature/category/infrastructure/category.interface'
import { EntityManager, Repository } from 'typeorm'
import { CategoryCreateRequest } from '../../../modules/feature/category/infrastructure/category.request'
import { categoryDummies } from './category.dummy'

export const categoryUpdateSeeder = async (): Promise<boolean> => {
  const data = categoryDummies
  const repo = new Repository<ICategory>(
    EntCategory,
    new EntityManager(dataSource),
  )

  data.forEach(async (data) => {
    const dataExist = await repo.findOne({ where: { key: data.key } })
    const dataCreate = new CategoryCreateRequest()
    Object.assign(dataCreate, data)

    dataExist && (dataCreate.id = dataExist.id)
    await repo.save(dataCreate)
  })

  Logger.log(
    'Success run categories seeders ',
    String([data.map((data) => data.key)]),
  )

  return true
}
