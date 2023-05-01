import { Injectable } from '@nestjs/common'
import { EntCategory } from '../infrastructure/category.entity'
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
    const data = new EntCategory()
    Object.assign(data, req)

    return await this.categoryService.create(data)
  }

  async findOneOrFail(id: string): Promise<ICategory> {
    return await this.categoryService.findOneOrFail(id)
  }

  async update(id: string, req: CategoryUpdateRequest): Promise<ICategory> {
    const data = await this.categoryService.findNoRelation(id)
    Object.assign(data, req)

    return await this.categoryService.update(data)
  }

  async remove(id: string): Promise<ICategory> {
    const data = this.categoryService.findNoRelation(id)
    await this.categoryService.remove(id)
    return data
  }

  async softRemove(id: string): Promise<ICategory> {
    const data = this.categoryService.findNoRelation(id)
    await this.categoryService.softRemove(id)
    return data
  }
}
