import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { NotificationCategoryIndexRequest } from '@server/modules/notification/notification-category/infrastructure/notification-category-index.request'
import {
  NotificationCategoryCreateRequest,
  NotificationCategoryUpdateRequest,
} from '@server/modules/notification/notification-category/infrastructure/notification-category.request'
import { NotificationCategoryResponse } from '@server/modules/notification/notification-category/infrastructure/notification-category.response'
import { notification } from 'antd'
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { getColorPicker } from '../../../../Components/Molecules/ColorPicker/ColorPicker.util'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (
  data: NotificationCategoryCreateRequest | NotificationCategoryUpdateRequest,
): NotificationCategoryCreateRequest | NotificationCategoryUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string
  data.labelColor = getColorPicker(data.labelColor)

  return data
}
export class NotificationCategoryAction {
  static useIndex(
    req?: NotificationCategoryIndexRequest,
    options?:
      | UseQueryOptions<IPaginateResponse<NotificationCategoryResponse>>
      | undefined,
  ): UseQueryResult<IPaginateResponse<NotificationCategoryResponse>> {
    const fetch = async () =>
      await API.get(Path.notificationCategory.index, req)
    return useQuery(
      [NotificationCategoryAction.useIndex.name, req],
      fetch,
      options,
    )
  }

  static async create(
    data: NotificationCategoryCreateRequest,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    data = dto(data)
    const res = await API.post(Path.notificationCategory.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(
    id: string | undefined,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const res: IApiRes<NotificationCategoryResponse> = await API.get(
      Path.notificationCategory.id(id),
    )

    return res
  }

  static async update(
    id: string,
    data: NotificationCategoryUpdateRequest,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    data = dto(data)
    const res = await API.put(Path.notificationCategory.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(
    id: string,
  ): Promise<IApiRes<NotificationCategoryResponse>> {
    const res = await API.delete(Path.notificationCategory.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
