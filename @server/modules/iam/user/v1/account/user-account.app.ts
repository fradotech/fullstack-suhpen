import { Injectable } from '@nestjs/common'
import { IUser } from '../../infrastructure/user.interface'
import { UserService } from '../../infrastructure/user.service'

@Injectable()
export class UserAccountApp {
  constructor(private readonly userService: UserService) {}

  async findOneWithRoles(id: string): Promise<IUser> {
    return await this.userService.findOneWithRoles(id)
  }
}
