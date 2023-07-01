import { Injectable } from '@nestjs/common'
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
    const data = UserCreateRequest.dto(req)
    return await this.userService.save(data)
  }

  async findOneOrFail(id: string): Promise<IUser> {
    return await this.userService.findOneByOrFail({ id })
  }

  async update(id: string, req: UserUpdateRequest): Promise<IUser> {
    const data = await this.userService.findOneByOrFail({ id })
    const dataUpdate = UserUpdateRequest.dto(data, req)
    return await this.userService.save(dataUpdate)
  }

  async delete(id: string): Promise<IUser> {
    const data = await this.userService.findOneByOrFail({ id })
    await this.userService.delete(id)
    return data
  }
}
