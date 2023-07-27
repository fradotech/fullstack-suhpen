import { AccountResponse } from '@server/modules/iam/account/infrastructure/account.response'
import { AccountUpdateRequest } from '@server/modules/iam/account/v1/account.request'
import { notification } from 'antd'
import dayjs from 'dayjs'
import { IApiRes } from '../../../../../@server/infrastructure/interfaces/api-responses.interface'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (data: AccountUpdateRequest): AccountUpdateRequest => {
  data.avatar = getAttachment(data.avatar) as string

  return data
}

export class AccountAction {
  static async userLoggedServer(): Promise<IApiRes<AccountResponse>> {
    const res = await API.get(Path.account.index)
    res.data.birthDate = res.data.birthDate && dayjs(res.data.birthDate)

    return res
  }

  static async update(
    data: AccountUpdateRequest,
  ): Promise<IApiRes<AccountResponse>> {
    data = dto(data)
    const res: IApiRes<AccountResponse> = await API.put(
      Path.account.index,
      data,
    )

    res.data && notification.success({ message: 'Success update data' })

    return res
  }
}
