import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserUpdateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { notification } from 'antd'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../services/api.service'

const dataPrepare = (data: UserUpdateRequest): UserUpdateRequest => {
  data.avatar = getAttachment(data.avatar) as string

  return data
}

export const accountAction = {
  getUserLogged: async (): Promise<IApiRes<UserResponse>> => {
    return await API.get(Route.account)
  },

  update: async (data: UserUpdateRequest): Promise<IApiRes<UserResponse>> => {
    data = dataPrepare(data)
    const res: IApiRes<UserResponse> = await API.put(Route.account, data)

    res.data && notification.success({ message: 'Success update data' })

    return res
  },
}
