import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user-index.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import {
  UserCreateRequest,
  UserUpdateRequest,
} from '@server/modules/iam/user/v1/user.request'
import { notification } from 'antd'
import dayjs from 'dayjs'
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (
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
    options?: UseQueryOptions<IPaginateResponse<UserResponse>>,
  ): UseQueryResult<IPaginateResponse<UserResponse>> {
    const fetch = async () => await API.get(Path.user.index, req)
    return useQuery([Path.user.index, req], fetch, options)
  }

  static async create(data: UserCreateRequest): Promise<IApiRes<UserResponse>> {
    data = dto(data) as UserCreateRequest
    const res = await API.post(Path.user.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(id: string | undefined): Promise<IApiRes<UserResponse>> {
    const res: IApiRes<UserResponse> = await API.get(Path.user.id(id))
    res.data.birthDate = res.data.birthDate && dayjs(res.data.birthDate)
    return res
  }

  static async update(
    id: string,
    data: UserUpdateRequest,
  ): Promise<IApiRes<UserResponse>> {
    data = dto(data)
    const res = await API.put(Path.user.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<UserResponse>> {
    const res = await API.delete(Path.user.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}
