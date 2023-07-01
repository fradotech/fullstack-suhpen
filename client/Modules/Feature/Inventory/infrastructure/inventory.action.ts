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
import { UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../infrastructure/api.service'

const dto = (
  data: InventoryCreateRequest | InventoryUpdateRequest,
): InventoryCreateRequest | InventoryUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string

  return data
}

export class InventoryAction {
  static useIndex(
    req?: InventoryIndexRequest,
    productId?: string,
  ): UseQueryResult<IPaginateResponse<InventoryResponse>> {
    req.productId = productId
    const fetch = async () => await API.get(Route.inventory.index, req)
    return useQuery([InventoryAction.useIndex.name, req], fetch)
  }

  static async create(
    data: InventoryCreateRequest,
  ): Promise<IApiRes<InventoryResponse>> {
    data = dto(data)
    const res = await API.post(Route.inventory.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(id: string): Promise<IApiRes<InventoryResponse>> {
    const res: IApiRes<InventoryResponse> = await API.get(
      Route.inventory.id(id),
    )

    res.data.expiredDate = res.data.expiredDate && dayjs(res.data.expiredDate)

    return res
  }

  static async update(
    id: string,
    data: InventoryUpdateRequest,
  ): Promise<IApiRes<InventoryResponse>> {
    data = dto(data)
    const res = await API.put(Route.inventory.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<InventoryResponse>> {
    const res = await API.delete(Route.inventory.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
