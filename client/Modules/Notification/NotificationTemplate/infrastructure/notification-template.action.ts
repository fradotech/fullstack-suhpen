import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { NotificationTemplateIndexRequest } from '@server/modules/notification/notification-template/infrastructure/notification-template-index.request'
import { NotificationTemplateResponse } from '@server/modules/notification/notification-template/infrastructure/notification-template.response'
import {
  NotificationTemplateCreateRequest,
  NotificationTemplateUpdateRequest,
} from '@server/modules/notification/notification-template/v1/notification-template.request'
import { notification } from 'antd'
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (
  data: NotificationTemplateCreateRequest | NotificationTemplateUpdateRequest,
): NotificationTemplateCreateRequest | NotificationTemplateUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string

  return data
}
export class NotificationTemplateAction {
  static useIndex(
    req?: NotificationTemplateIndexRequest,
    options?: UseQueryOptions<IPaginateResponse<NotificationTemplateResponse>>,
  ): UseQueryResult<IPaginateResponse<NotificationTemplateResponse>> {
    const fetch = async () =>
      await API.get(Path.notificationTemplate.index, req)
    return useQuery([Path.notificationTemplate.index, req], fetch, options)
  }

  static async create(
    data: NotificationTemplateCreateRequest,
  ): Promise<IApiRes<NotificationTemplateResponse>> {
    data = dto(data)
    const res = await API.post(Path.notificationTemplate.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(
    id: string | undefined,
  ): Promise<IApiRes<NotificationTemplateResponse>> {
    const res: IApiRes<NotificationTemplateResponse> = await API.get(
      Path.notificationTemplate.id(id),
    )

    return res
  }

  static async update(
    id: string,
    data: NotificationTemplateUpdateRequest,
  ): Promise<IApiRes<NotificationTemplateResponse>> {
    data = dto(data)
    const res = await API.put(Path.notificationTemplate.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(
    id: string,
  ): Promise<IApiRes<NotificationTemplateResponse>> {
    const res = await API.delete(Path.notificationTemplate.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
