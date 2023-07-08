import { Injectable } from '@nestjs/common'
import { ProductService } from '../../product/infrastructure/product.service'
import { IVariant } from '../infrastructure/variant.interface'
import {
  VariantCreateRequest,
  VariantUpdateRequest,
} from '../infrastructure/variant.request'
import { VariantService } from '../infrastructure/variant.service'

@Injectable()
export class VariantCrudApp {
  constructor(
    private readonly variantService: VariantService,
    private readonly productService: ProductService,
  ) {}

  async find(): Promise<IVariant[]> {
    return await this.variantService.find()
  }

  async create(req: VariantCreateRequest): Promise<IVariant> {
    const data = VariantCreateRequest.dto(req)

    data.product = await this.productService.findOneByOrFail({
      id: req.productId,
    })

    return await this.variantService.save(data)
  }

  async findOneOrFail(id: string): Promise<IVariant> {
    return await this.variantService.findOneByOrFail({ id })
  }

  async update(id: string, req: VariantUpdateRequest): Promise<IVariant> {
    const data = await this.variantService.findOneByOrFail({ id })
    const dataUpdate = VariantUpdateRequest.dto(data, req)

    return await this.variantService.save(dataUpdate)
  }

  async delete(id: string): Promise<IVariant> {
    const data = await this.variantService.findOneByOrFail({ id })
    await this.variantService.delete(id)
    return data
  }
}
