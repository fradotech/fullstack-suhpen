import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { VariantIndexRequest } from '@server/modules/feature/variant/infrastructure/variant-index.request'
import {
  VariantCreateRequest,
  VariantUpdateRequest,
} from '@server/modules/feature/variant/infrastructure/variant.request'
import { VariantResponse } from '@server/modules/feature/variant/infrastructure/variant.response'
import { notification } from 'antd'
import dayjs from 'dayjs'
import { UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (
  data: VariantCreateRequest | VariantUpdateRequest,
): VariantCreateRequest | VariantUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string

  return data
}

export class VariantAction {
  static useIndex(
    req?: VariantIndexRequest,
    productId?: string,
  ): UseQueryResult<IPaginateResponse<VariantResponse>> {
    req.productId = productId
    const fetch = async () => await API.get(Path.variant.index, req)
    return useQuery([VariantAction.useIndex.name, req], fetch)
  }

  static async create(
    data: VariantCreateRequest,
  ): Promise<IApiRes<VariantResponse>> {
    data = dto(data)
    const res = await API.post(Path.variant.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(id: string): Promise<IApiRes<VariantResponse>> {
    const res: IApiRes<VariantResponse> = await API.get(Path.variant.id(id))

    res.data.expiredDate = res.data.expiredDate && dayjs(res.data.expiredDate)

    return res
  }

  static async update(
    id: string,
    data: VariantUpdateRequest,
  ): Promise<IApiRes<VariantResponse>> {
    data = dto(data)
    const res = await API.put(Path.variant.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<VariantResponse>> {
    const res = await API.delete(Path.variant.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
