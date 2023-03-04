import { Injectable } from '@nestjs/common'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { UserIndexApp } from '../infrastructure/user-index.app'
import { UserIndexRequest } from '../infrastructure/user-index.request'
import { EttUser } from '../infrastructure/user.entity'
import { IUser } from '../infrastructure/user.interface'
import {
  UserCreateRequest,
  UserUpdateRequest,
} from '../infrastructure/user.request'
import { UserService } from '../infrastructure/user.service'

@Injectable()
export class UserCrudApp {
  constructor(
    private readonly userIndexApp: UserIndexApp,
    private readonly userService: UserService,
  ) {}

  async fetch(req: UserIndexRequest): Promise<IPaginateResponse<IUser>> {
    const res = await this.userIndexApp.fetch(req)
    return res
  }

  async create(req: UserCreateRequest): Promise<IUser> {
    const data = new EttUser()
    Object.assign(data, req)

    return await this.userService.create(data)
  }

  async find(): Promise<IUser[]> {
    return await this.userService.find()
  }

  async findOneOrFail(id: string): Promise<IUser> {
    return await this.userService.findOneOrFail(id)
  }

  async update(id: string, req: UserUpdateRequest): Promise<IUser> {
    const data = await this.userService.findOneOrFail(id)

    data.name = req.name
    data.gender = req.gender
    data.phoneNumber = req.phoneNumber
    data.avatar = req.avatar
    data.address = req.address
    data.birthDate = req.birthDate
    data.startAt = req.startAt
    data.endAt = req.endAt

    return await this.userService.update(data)
  }

  async remove(id: string): Promise<IUser> {
    const data = this.userService.findOneOrFail(id)
    await this.userService.remove(id)
    return data
  }

  async softRemove(id: string): Promise<IUser> {
    const data = this.userService.findOneOrFail(id)
    await this.userService.softRemove(id)
    return data
  }
}
