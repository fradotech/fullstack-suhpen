import { Injectable } from '@nestjs/common'
import { EntProduct } from '../infrastructure/product.entity'
import { IProduct } from '../infrastructure/product.interface'
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from '../infrastructure/product.request'
import { ProductService } from '../infrastructure/product.service'

@Injectable()
export class ProductCrudApp {
  constructor(private readonly productService: ProductService) {}

  async find(): Promise<IProduct[]> {
    return await this.productService.find()
  }

  async create(req: ProductCreateRequest): Promise<IProduct> {
    const data = new EntProduct()
    Object.assign(data, req)

    return await this.productService.create(data)
  }

  async findOneOrFail(id: string): Promise<IProduct> {
    return await this.productService.findOneOrFail(id)
  }

  async update(id: string, req: ProductUpdateRequest): Promise<IProduct> {
    const data = await this.productService.findNoRelation(id)
    Object.assign(data, req)

    delete data.categories

    return await this.productService.update(data)
  }

  async delete(id: string): Promise<IProduct> {
    const data = this.productService.findNoRelation(id)
    await this.productService.delete(id)
    return data
  }
}
