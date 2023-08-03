import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { NotificationPushIndexRequest } from '@server/modules/notification/notification-push/infrastructure/notification-push-index.request'
import { NotificationPushResponse } from '@server/modules/notification/notification-push/infrastructure/notification-push.response'
import {
  NotificationPushCreateRequest,
  NotificationPushUpdateRequest,
} from '@server/modules/notification/notification-push/v1/notification-push.request'
import { notification } from 'antd'
import { UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (
  data: NotificationPushCreateRequest | NotificationPushUpdateRequest,
): NotificationPushCreateRequest | NotificationPushUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string

  return data
}
export class NotificationPushAction {
  static useIndex(
    req?: NotificationPushIndexRequest,
  ): UseQueryResult<IPaginateResponse<NotificationPushResponse>> {
    const fetch = async () => await API.get(Path.notificationPush.index, req)
    return useQuery([Path.notificationPush.index, req], fetch)
  }

  static async create(
    data: NotificationPushCreateRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    data = dto(data)
    const res = await API.post(Path.notificationPush.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(
    id: string | undefined,
  ): Promise<IApiRes<NotificationPushResponse>> {
    const res: IApiRes<NotificationPushResponse> = await API.get(
      Path.notificationPush.id(id),
    )

    return res
  }

  static async update(
    id: string,
    data: NotificationPushUpdateRequest | NotificationPushCreateRequest,
  ): Promise<IApiRes<NotificationPushResponse>> {
    data = dto(data)
    const res = await API.put(Path.notificationPush.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<NotificationPushResponse>> {
    const res = await API.delete(Path.notificationPush.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
