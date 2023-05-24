import { Injectable } from '@nestjs/common'
import { CategoryService } from '../../category/infrastructure/category.service'
import { EntProduct } from '../infrastructure/product.entity'
import { IProduct } from '../infrastructure/product.interface'
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from '../infrastructure/product.request'
import { ProductService } from '../infrastructure/product.service'

@Injectable()
export class ProductCrudApp {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  async find(): Promise<IProduct[]> {
    return await this.productService.find()
  }

  async create(req: ProductCreateRequest): Promise<IProduct> {
    const data = new EntProduct()
    Object.assign(data, req)

    data.categories = await this.categoryService.findByIds(req.categoryIds)

    return await this.productService.create(data)
  }

  async findOneOrFail(id: string): Promise<IProduct> {
    return await this.productService.findOneOrFail(id)
  }

  async update(id: string, req: ProductUpdateRequest): Promise<IProduct> {
    const data = await this.productService.findOneOrFail(id)
    Object.assign(data, req)

    data.categories = await this.categoryService.findByIds(req.categoryIds)

    return await this.productService.create(data)
  }

  async delete(id: string): Promise<IProduct> {
    return await this.productService.delete(id)
  }
}
