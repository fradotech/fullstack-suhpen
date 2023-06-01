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
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../services/api.service'

const dataPrepare = (
  data: UserCreateRequest | UserUpdateRequest,
): UserCreateRequest | UserUpdateRequest => {
  data.birthDate =
    data.birthDate && (data.birthDate as unknown as dayjs.Dayjs).toDate()
  data.avatar = getAttachment(data.avatar) as string

  return data
}

export const userAction = {
  fetch: async (
    req?: UserIndexRequest,
  ): Promise<IPaginateResponse<UserResponse>> => {
    return await API.get(Route.user.index, req)
  },

  create: async (data: UserCreateRequest): Promise<IApiRes<UserResponse>> => {
    data = dataPrepare(data) as UserCreateRequest
    const res = await API.post(Route.user.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  },

  findOne: async (id: string): Promise<IApiRes<UserResponse>> => {
    const res: IApiRes<UserResponse> = await API.get(Route.user.id(id))

    res.data.birthDate = res.data.birthDate && dayjs(res.data.birthDate)

    return res
  },

  update: async (
    id: string,
    data: UserUpdateRequest,
  ): Promise<IApiRes<UserResponse>> => {
    data = dataPrepare(data)
    const res = await API.put(Route.user.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  },

  delete: async (id: string): Promise<IApiRes<UserResponse>> => {
    const res = await API.delete(Route.user.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  },
}
