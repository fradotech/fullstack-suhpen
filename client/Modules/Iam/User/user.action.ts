import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user-index.request'
import {
  UserCreateRequest,
  UserUpdateRequest,
} from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { notification } from 'antd'
import dayjs from 'dayjs'
import { getAttachment } from '../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'

const dataPrepare = (
  data: UserCreateRequest | UserUpdateRequest,
): UserCreateRequest | UserUpdateRequest => {
  data.birthDate =
    data.birthDate && (data.birthDate as unknown as dayjs.Dayjs).toDate()
  data.startAt = data.dateRange && data.dateRange[0]?.toDate()
  data.endAt = data.dateRange && data.dateRange[1]?.toDate()
  data.avatar = getAttachment(data.avatar) as string

  return data
}

export const userAction = {
  fetch: async (
    req?: UserIndexRequest,
  ): Promise<IPaginateResponse<UserResponse>> => {
    return await axiosService.get(Route.users, req)
  },

  create: async (data: UserCreateRequest): Promise<IApiRes<UserResponse>> => {
    data = dataPrepare(data) as UserCreateRequest
    const res = await axiosService.post(Route.users, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  },

  findOne: async (id: string): Promise<IApiRes<UserResponse>> => {
    const res: IApiRes<UserResponse> = await axiosService.get(
      Route.user.detail(id),
    )

    res.data.birthDate = res.data.birthDate && dayjs(res.data.birthDate)
    res.data.dateRange = [
      res.data.startAt && dayjs(res.data.startAt),
      res.data.endAt && dayjs(res.data.endAt),
    ]

    return res
  },

  update: async (
    id: string,
    data: UserUpdateRequest,
  ): Promise<IApiRes<UserResponse>> => {
    data = dataPrepare(data)
    const res = await axiosService.put(Route.user.detail(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  },

  remove: async (id: string): Promise<IApiRes<UserResponse>> => {
    return await axiosService.delete(Route.user.detail(id))
  },
}
