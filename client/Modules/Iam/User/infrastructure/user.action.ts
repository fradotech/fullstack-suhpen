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
import { UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../infrastructure/api.service'

const dataPrepare = (
  data: UserCreateRequest | UserUpdateRequest,
): UserCreateRequest | UserUpdateRequest => {
  data.birthDate =
    data.birthDate && (data.birthDate as unknown as dayjs.Dayjs).toDate()
  data.avatar = getAttachment(data.avatar) as string

  return data
}

export class UserAction {
  static useIndex(
    req?: UserIndexRequest,
  ): UseQueryResult<IPaginateResponse<UserResponse>> {
    const fetch = async () => await API.get(Route.user.index, req)

    return useQuery<IPaginateResponse<UserResponse>>(
      [UserAction.useIndex.name, req],
      fetch,
    )
  }

  static async create(data: UserCreateRequest): Promise<IApiRes<UserResponse>> {
    data = dataPrepare(data) as UserCreateRequest
    const res = await API.post(Route.user.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(id: string): Promise<IApiRes<UserResponse>> {
    const res: IApiRes<UserResponse> = await API.get(Route.user.id(id))
    res.data.birthDate = res.data.birthDate && dayjs(res.data.birthDate)
    return res
  }

  static async update(
    id: string,
    data: UserUpdateRequest,
  ): Promise<IApiRes<UserResponse>> {
    data = dataPrepare(data)
    const res = await API.put(Route.user.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<UserResponse>> {
    const res = await API.delete(Route.user.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
