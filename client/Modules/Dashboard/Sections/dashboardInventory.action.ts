import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { Route } from '../../../Enums/Route'
import { API } from '../../../services/api.service'

export const dashboardInventoryAction = {
  buyPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await API.get(
      Route.dashboard.inventory.aggregate('buyPrice'),
    )
    return res.data
  },

  sellPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await API.get(
      Route.dashboard.inventory.aggregate('sellPrice'),
    )
    return res.data
  },

  marginPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await API.get(
      Route.dashboard.inventory.aggregate('marginPrice'),
    )
    return res.data
  },
}
