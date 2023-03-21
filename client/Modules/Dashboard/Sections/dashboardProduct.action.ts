import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'

export const dashboardProductAction = {
  buyPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await axiosService.get(
      Route.dashboard.product.aggregate(dashboardProductAction.buyPrice.name),
    )
    return res.data
  },

  sellPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await axiosService.get(
      Route.dashboard.product.aggregate(dashboardProductAction.sellPrice.name),
    )
    return res.data
  },

  marginPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await axiosService.get(
      Route.dashboard.product.aggregate(
        dashboardProductAction.marginPrice.name,
      ),
    )
    return res.data
  },
}
