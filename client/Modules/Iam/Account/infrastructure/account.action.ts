import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserUpdateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { notification } from 'antd'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../infrastructure/api.service'

const dto = (data: UserUpdateRequest): UserUpdateRequest => {
  data.avatar = getAttachment(data.avatar) as string

  return data
}

export const accountAction = {
  getUserLogged: async (): Promise<IApiRes<UserResponse>> => {
    return await API.get(Route.account)
  },

  update: async (data: UserUpdateRequest): Promise<IApiRes<UserResponse>> => {
    data = dto(data)
    const res: IApiRes<UserResponse> = await API.put(Route.account, data)

    res.data && notification.success({ message: 'Success update data' })

    return res
  },
}
