import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ProductIndexRequest } from '@server/modules/feature/product/infrastructure/product-index.request'
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from '@server/modules/feature/product/infrastructure/product.request'
import { ProductResponse } from '@server/modules/feature/product/infrastructure/product.response'
import { notification } from 'antd'
import { UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Path } from '../../../../Enums/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (
  data: ProductCreateRequest | ProductUpdateRequest,
): ProductCreateRequest | ProductUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string

  return data
}

export class ProductAction {
  static useIndex(
    req?: ProductIndexRequest,
  ): UseQueryResult<IPaginateResponse<ProductResponse>> {
    const fetch = async () => await API.get(Path.product.index, req)
    return useQuery([ProductAction.useIndex.name, req], fetch)
  }

  static async create(
    data: ProductCreateRequest,
  ): Promise<IApiRes<ProductResponse>> {
    data = dto(data)
    const res = await API.post(Path.product.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(id: string): Promise<IApiRes<ProductResponse>> {
    const res: IApiRes<ProductResponse> = await API.get(Path.product.id(id))

    return res
  }

  static async update(
    id: string,
    data: ProductUpdateRequest,
  ): Promise<IApiRes<ProductResponse>> {
    data = dto(data)
    const res = await API.put(Path.product.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<ProductResponse>> {
    const res = await API.delete(Path.product.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
