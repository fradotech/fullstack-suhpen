import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { CategoryIndexRequest } from '@server/modules/feature/category/infrastructure/category-index.request'
import {
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from '@server/modules/feature/category/infrastructure/category.request'
import { CategoryResponse } from '@server/modules/feature/category/infrastructure/category.response'
import { notification } from 'antd'
import { UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { getColorPicker } from '../../../../Components/Molecules/ColorPicker/ColorPicker.util'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../infrastructure/api.service'

const dataPrepare = (
  data: CategoryCreateRequest | CategoryUpdateRequest,
): CategoryCreateRequest | CategoryUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string
  data.labelColor = getColorPicker(data.labelColor)

  return data
}

export class CategoryAction {
  static useIndex(
    req?: CategoryIndexRequest,
  ): UseQueryResult<IPaginateResponse<CategoryResponse>> {
    const fetch = async () => await API.get(Route.category.index, req)
    return useQuery([CategoryAction.useIndex.name, req], fetch)
  }

  static async create(
    data: CategoryCreateRequest,
  ): Promise<IApiRes<CategoryResponse>> {
    data = dataPrepare(data) as CategoryCreateRequest
    const res = await API.post(Route.category.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(id: string): Promise<IApiRes<CategoryResponse>> {
    const res: IApiRes<CategoryResponse> = await API.get(Route.category.id(id))

    return res
  }

  static async update(
    id: string,
    data: CategoryUpdateRequest,
  ): Promise<IApiRes<CategoryResponse>> {
    data = dataPrepare(data)
    const res = await API.put(Route.category.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<CategoryResponse>> {
    const res = await API.delete(Route.category.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
