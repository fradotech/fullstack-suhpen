import { Injectable } from '@nestjs/common'
import { ICategory } from '../infrastructure/category.interface'
import {
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from '../infrastructure/category.request'
import { CategoryService } from '../infrastructure/category.service'

@Injectable()
export class CategoryCrudApp {
  constructor(private readonly categoryService: CategoryService) {}

  async find(): Promise<ICategory[]> {
    return await this.categoryService.find()
  }

  async create(req: CategoryCreateRequest): Promise<ICategory> {
    const data = CategoryCreateRequest.dto(req)
    return await this.categoryService.save(data)
  }

  async findOneOrFail(id: string): Promise<ICategory> {
    return await this.categoryService.findOneByOrFail({ id })
  }

  async update(id: string, req: CategoryUpdateRequest): Promise<ICategory> {
    const data = await this.categoryService.findOneByOrFail({ id })
    const dataUpdate = CategoryUpdateRequest.dto(data, req)
    return await this.categoryService.save(dataUpdate)
  }

  async delete(id: string): Promise<ICategory> {
    const data = await this.categoryService.findOneByOrFail({ id })
    await this.categoryService.delete(id)
    return data
  }
}
