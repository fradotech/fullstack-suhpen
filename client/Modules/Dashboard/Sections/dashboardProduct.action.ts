import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { IAggreate } from '@server/modules/dashboard/infrastructure/dashboard.interface'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'

export const dashboardProductAction = {
  buyPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await axiosService.get(
      Route.dashboard.product.aggregate('buyPrice'),
    )
    return res.data
  },

  sellPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await axiosService.get(
      Route.dashboard.product.aggregate('sellPrice'),
    )
    return res.data
  },

  marginPrice: async (): Promise<IAggreate> => {
    const res: IApiRes<IAggreate> = await axiosService.get(
      Route.dashboard.product.aggregate('marginPrice'),
    )
    return res.data
  },
}
