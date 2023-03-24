import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { InventoryIndexRequest } from '@server/modules/feature/inventory/infrastructure/inventory-index.request'
import {
  InventoryCreateRequest,
  InventoryUpdateRequest,
} from '@server/modules/feature/inventory/infrastructure/inventory.request'
import { InventoryResponse } from '@server/modules/feature/inventory/infrastructure/inventory.response'
import { notification } from 'antd'
import { Route } from '../../../../Enums/Route'
import { axiosService } from '../../../../services/axios.service'

const dataPrepare = (
  data: InventoryCreateRequest | InventoryUpdateRequest,
): InventoryCreateRequest | InventoryUpdateRequest => {
  return data
}

export const inventoryAction = {
  fetch: async (
    req?: InventoryIndexRequest,
    productId?: string,
  ): Promise<IPaginateResponse<InventoryResponse>> => {
    req.productId = productId
    return await axiosService.get(Route.inventory.index, req)
  },

  create: async (
    data: InventoryCreateRequest,
  ): Promise<IApiRes<InventoryResponse>> => {
    data = dataPrepare(data) as InventoryCreateRequest
    const res = await axiosService.post(Route.inventory.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  },

  findOne: async (id: string): Promise<IApiRes<InventoryResponse>> => {
    const res: IApiRes<InventoryResponse> = await axiosService.get(
      Route.inventory.id(id),
    )

    return res
  },

  update: async (
    id: string,
    data: InventoryUpdateRequest,
  ): Promise<IApiRes<InventoryResponse>> => {
    data = dataPrepare(data)
    const res = await axiosService.put(Route.inventory.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  },

  remove: async (id: string): Promise<IApiRes<InventoryResponse>> => {
    return await axiosService.delete(Route.inventory.id(id))
  },
}
