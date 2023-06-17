import { Injectable } from '@nestjs/common'
import { CategoryService } from '../../category/infrastructure/category.service'
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
    const data = ProductCreateRequest.dto(req)

    req.categoryIds &&
      (data.categories = await this.categoryService.findByInIds(
        req.categoryIds,
      ))

    return await this.productService.save(data)
  }

  async findOneOrFail(id: string): Promise<IProduct> {
    return await this.productService.findOneByOrFail({ id })
  }

  async update(id: string, req: ProductUpdateRequest): Promise<IProduct> {
    const data = await this.productService.findOneByOrFail({ id })
    const dataUpdate = ProductUpdateRequest.dto(data, req)

    req.categoryIds &&
      (dataUpdate.categories = await this.categoryService.findByInIds(
        req.categoryIds,
      ))

    return await this.productService.save(dataUpdate)
  }

  async delete(id: string): Promise<IProduct> {
    await this.productService.delete(id)
    return await this.productService.findOneByOrFail({ id })
  }
}
