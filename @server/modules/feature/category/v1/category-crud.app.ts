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
  constructor(private readonly userService: CategoryService) {}

  async find(): Promise<ICategory[]> {
    return await this.userService.find()
  }

  async create(req: CategoryCreateRequest): Promise<ICategory> {
    const data = new EntCategory()
    Object.assign(data, req)

    return await this.userService.create(data)
  }

  async findOneOrFail(id: string): Promise<ICategory> {
    return await this.userService.findOneOrFail(id)
  }

  async update(id: string, req: CategoryUpdateRequest): Promise<ICategory> {
    const data = await this.userService.findOneOrFail(id)
    Object.assign(data, req)

    return await this.userService.update(data)
  }

  async remove(id: string): Promise<ICategory> {
    const data = this.userService.findOneOrFail(id)
    await this.userService.remove(id)
    return data
  }

  async softRemove(id: string): Promise<ICategory> {
    const data = this.userService.findOneOrFail(id)
    await this.userService.softRemove(id)
    return data
  }
}
