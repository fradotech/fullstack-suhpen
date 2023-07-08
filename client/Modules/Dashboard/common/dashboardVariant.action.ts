import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { Path } from '../../../common/Path'
import { API } from '../../../infrastructure/api.service'

export const dashboardVariantAction = {
  buyPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await API.get(
      Path.dashboard.variant.aggregate('buyPrice'),
    )
    return res.data
  },

  sellPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await API.get(
      Path.dashboard.variant.aggregate('sellPrice'),
    )
    return res.data
  },

  marginPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await API.get(
      Path.dashboard.variant.aggregate('marginPrice'),
    )
    return res.data
  },
}
