import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import {
  UserCreateRequest,
  UserIndexRequest,
  UserUpdateRequest,
} from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'

export const userAction = {
  fetch: async (
    req?: UserIndexRequest,
  ): Promise<IPaginateResponse<UserResponse>> => {
    return await axiosService.get(Route.Users, req)
  },

  create: async (data: UserCreateRequest): Promise<IApiRes<UserResponse>> => {
    data.password = data.email
    return await axiosService.post(Route.Users, data)
  },

  findOne: async (id: string): Promise<IApiRes<UserResponse>> => {
    return await axiosService.get(`${Route.Users}/${id}`)
  },

  update: async (
    id: string,
    data: UserUpdateRequest,
  ): Promise<IApiRes<UserResponse>> => {
    return await axiosService.put(`${Route.Users}/${id}`, data)
  },

  remove: async (id: string): Promise<IApiRes<UserResponse>> => {
    return await axiosService.delete(`${Route.Users}/${id}`)
  },
}
