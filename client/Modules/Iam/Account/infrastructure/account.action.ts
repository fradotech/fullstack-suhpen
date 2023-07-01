import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserUpdateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { notification } from 'antd'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { API } from '../../../../infrastructure/api.service'
import { RoutesAccount } from './../Account.module'

const dto = (data: UserUpdateRequest): UserUpdateRequest => {
  data.avatar = getAttachment(data.avatar) as string

  return data
}

export class AccountAction {
  constructor(private readonly route: typeof RoutesAccount) {}

  async getUserLogged(): Promise<IApiRes<UserResponse>> {
    return await API.get(this.route.account)
  }

  async update(data: UserUpdateRequest): Promise<IApiRes<UserResponse>> {
    data = dto(data)
    const res: IApiRes<UserResponse> = await API.put(this.route.account, data)

    res.data && notification.success({ message: 'Success update data' })

    return res
  }
}
