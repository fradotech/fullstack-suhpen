import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { Path } from '../../../common/Path'
import { API } from '../../../infrastructure/api.service'

export class DashboardUserAction {
  static async otp(): Promise<IAggreate> {
    const res: IApiRes<IAggreate> = await API.get(
      Path.dashboard.user.aggregate('otp'),
    )
    return res.data
  }
}
