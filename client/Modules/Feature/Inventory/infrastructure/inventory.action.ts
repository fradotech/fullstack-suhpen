import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { InventoryIndexRequest } from '@server/modules/feature/inventory/infrastructure/inventory-index.request'
import {
  InventoryCreateRequest,
  InventoryUpdateRequest,
} from '@server/modules/feature/inventory/infrastructure/inventory.request'
import { InventoryResponse } from '@server/modules/feature/inventory/infrastructure/inventory.response'
import { notification } from 'antd'
import dayjs from 'dayjs'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../infrastructure/api.service'

const dataPrepare = (
  data: InventoryCreateRequest | InventoryUpdateRequest,
): InventoryCreateRequest | InventoryUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string

  return data
}

export const inventoryAction = {
  fetch: async (
    req?: InventoryIndexRequest,
    productId?: string,
  ): Promise<IPaginateResponse<InventoryResponse>> => {
    req.productId = productId
    return await API.get(Route.inventory.index, req)
  },

  create: async (
    data: InventoryCreateRequest,
  ): Promise<IApiRes<InventoryResponse>> => {
    data = dataPrepare(data) as InventoryCreateRequest
    const res = await API.post(Route.inventory.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  },

  findOne: async (id: string): Promise<IApiRes<InventoryResponse>> => {
    const res: IApiRes<InventoryResponse> = await API.get(
      Route.inventory.id(id),
    )

    res.data.expiredDate = res.data.expiredDate && dayjs(res.data.expiredDate)

    return res
  },

  update: async (
    id: string,
    data: InventoryUpdateRequest,
  ): Promise<IApiRes<InventoryResponse>> => {
    data = dataPrepare(data)
    const res = await API.put(Route.inventory.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  },

  delete: async (id: string): Promise<IApiRes<InventoryResponse>> => {
    const res = await API.delete(Route.inventory.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  },
}
