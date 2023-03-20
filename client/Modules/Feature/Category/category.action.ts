import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { CategoryIndexRequest } from '@server/modules/feature/category/infrastructure/category-index.request'
import {
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from '@server/modules/feature/category/infrastructure/category.request'
import { CategoryResponse } from '@server/modules/feature/category/infrastructure/category.response'
import { notification } from 'antd'
import { getAttachment } from '../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'

const dataPrepare = (
  data: CategoryCreateRequest | CategoryUpdateRequest,
): CategoryCreateRequest | CategoryUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string

  return data
}

export const categoryAction = {
  fetch: async (
    req?: CategoryIndexRequest,
  ): Promise<IPaginateResponse<CategoryResponse>> => {
    return await axiosService.get(Route.category.index, req)
  },

  create: async (
    data: CategoryCreateRequest,
  ): Promise<IApiRes<CategoryResponse>> => {
    data = dataPrepare(data) as CategoryCreateRequest
    const res = await axiosService.post(Route.category.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  },

  findOne: async (id: string): Promise<IApiRes<CategoryResponse>> => {
    const res: IApiRes<CategoryResponse> = await axiosService.get(
      Route.category.id(id),
    )

    return res
  },

  update: async (
    id: string,
    data: CategoryUpdateRequest,
  ): Promise<IApiRes<CategoryResponse>> => {
    data = dataPrepare(data)
    const res = await axiosService.put(Route.category.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  },

  remove: async (id: string): Promise<IApiRes<CategoryResponse>> => {
    return await axiosService.delete(Route.category.id(id))
  },
}
