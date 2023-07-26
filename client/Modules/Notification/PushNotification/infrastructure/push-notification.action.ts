import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { PushNotificationIndexRequest } from '@server/modules/notification/push-notification/infrastructure/push-notification-index.request'
import {
  PushNotificationCreateRequest,
  PushNotificationUpdateRequest,
} from '@server/modules/notification/push-notification/infrastructure/push-notification.request'
import { PushNotificationResponse } from '@server/modules/notification/push-notification/infrastructure/push-notification.response'
import { notification } from 'antd'
import { UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (
  data: PushNotificationCreateRequest | PushNotificationUpdateRequest,
): PushNotificationCreateRequest | PushNotificationUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string

  return data
}
export class PushNotificationAction {
  static useIndex(
    req?: PushNotificationIndexRequest,
  ): UseQueryResult<IPaginateResponse<PushNotificationResponse>> {
    const fetch = async () => await API.get(Path.pushNotification.index, req)
    return useQuery([Path.pushNotification.index, req], fetch)
  }

  static async create(
    data: PushNotificationCreateRequest,
  ): Promise<IApiRes<PushNotificationResponse>> {
    data = dto(data)
    const res = await API.post(Path.pushNotification.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(
    id: string | undefined,
  ): Promise<IApiRes<PushNotificationResponse>> {
    const res: IApiRes<PushNotificationResponse> = await API.get(
      Path.pushNotification.id(id),
    )

    return res
  }

  static async update(
    id: string,
    data: PushNotificationUpdateRequest | PushNotificationCreateRequest,
  ): Promise<IApiRes<PushNotificationResponse>> {
    data = dto(data)
    const res = await API.put(Path.pushNotification.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<PushNotificationResponse>> {
    const res = await API.delete(Path.pushNotification.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
