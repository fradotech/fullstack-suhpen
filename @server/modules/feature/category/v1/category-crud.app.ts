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
  constructor(private readonly productService: CategoryService) {}

  async find(): Promise<ICategory[]> {
    return await this.productService.find()
  }

  async create(req: CategoryCreateRequest): Promise<ICategory> {
    const data = new EntCategory()
    Object.assign(data, req)

    return await this.productService.create(data)
  }

  async findOneOrFail(id: string): Promise<ICategory> {
    return await this.productService.findOneOrFail(id)
  }

  async update(id: string, req: CategoryUpdateRequest): Promise<ICategory> {
    const data = await this.productService.findOneOrFail(id)
    Object.assign(data, req)

    return await this.productService.update(data)
  }

  async remove(id: string): Promise<ICategory> {
    const data = this.productService.findOneOrFail(id)
    await this.productService.remove(id)
    return data
  }

  async softRemove(id: string): Promise<ICategory> {
    const data = this.productService.findOneOrFail(id)
    await this.productService.softRemove(id)
    return data
  }
}
