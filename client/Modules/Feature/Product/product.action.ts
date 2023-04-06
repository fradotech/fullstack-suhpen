import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ProductIndexRequest } from '@server/modules/feature/product/infrastructure/product-index.request'
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from '@server/modules/feature/product/infrastructure/product.request'
import { ProductResponse } from '@server/modules/feature/product/infrastructure/product.response'
import { notification } from 'antd'
import { getAttachment } from '../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'

const dataPrepare = (
  data: ProductCreateRequest | ProductUpdateRequest,
): ProductCreateRequest | ProductUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string

  return data
}

export const productAction = {
  fetch: async (
    req?: ProductIndexRequest,
  ): Promise<IPaginateResponse<ProductResponse>> => {
    return await axiosService.get(Route.product.index, req)
  },

  create: async (
    data: ProductCreateRequest,
  ): Promise<IApiRes<ProductResponse>> => {
    data = dataPrepare(data) as ProductCreateRequest
    const res = await axiosService.post(Route.product.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  },

  findOne: async (id: string): Promise<IApiRes<ProductResponse>> => {
    const res: IApiRes<ProductResponse> = await axiosService.get(
      Route.product.id(id),
    )

    return res
  },

  update: async (
    id: string,
    data: ProductUpdateRequest,
  ): Promise<IApiRes<ProductResponse>> => {
    data = dataPrepare(data)
    const res = await axiosService.put(Route.product.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  },

  remove: async (id: string): Promise<IApiRes<ProductResponse>> => {
    const res = await axiosService.delete(Route.product.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  },
}
