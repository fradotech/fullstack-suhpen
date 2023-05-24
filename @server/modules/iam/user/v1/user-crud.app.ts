import { Injectable } from '@nestjs/common'
import { EntUser } from '../infrastructure/user.entity'
import { IUser } from '../infrastructure/user.interface'
import {
  UserCreateRequest,
  UserUpdateRequest,
} from '../infrastructure/user.request'
import { UserService } from '../infrastructure/user.service'

@Injectable()
export class UserCrudApp {
  constructor(private readonly userService: UserService) {}

  async find(): Promise<IUser[]> {
    return await this.userService.find()
  }

  async create(req: UserCreateRequest): Promise<IUser> {
    const data = new EntUser()
    Object.assign(data, req)

    return await this.userService.create(data)
  }

  async findOneOrFail(id: string): Promise<IUser> {
    return await this.userService.findOneOrFail(id)
  }

  async update(id: string, req: UserUpdateRequest): Promise<IUser> {
    const data = await this.userService.findNoRelation(id)

    data.name = req.name
    data.gender = req.gender
    data.phoneNumber = req.phoneNumber
    data.avatar = req.avatar
    data.address = req.address
    data.birthDate = req.birthDate

    return await this.userService.update(data)
  }

  async delete(id: string): Promise<IUser> {
    return await this.userService.delete(id)
  }
}
