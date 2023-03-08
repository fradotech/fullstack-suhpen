import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserUpdateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { notification } from 'antd'
import { getAttachment } from '../../../Components/Molecules/Attachment/attachment.util'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'

const dataPrepare = (data: UserUpdateRequest): UserUpdateRequest => {
  data.avatar = getAttachment(data.avatar) as string

  return data
}

export const accountAction = {
  getUserLogged: async (): Promise<IApiRes<UserResponse>> => {
    return await axiosService.get(Route.Account)
  },

  update: async (data: UserUpdateRequest): Promise<IApiRes<UserResponse>> => {
    data = dataPrepare(data)
    const res: IApiRes<UserResponse> = await axiosService.put(
      Route.Account,
      data,
    )

    res.data && notification.success({ message: 'Success update data' })

    return res
  },
}
