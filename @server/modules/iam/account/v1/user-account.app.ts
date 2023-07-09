import { Injectable } from '@nestjs/common'
import { IUser } from '../../user/infrastructure/user.interface'
import { UserService } from '../../user/infrastructure/user.service'
import { AccountUpdateRequest } from '../infrastructure/account.request'

@Injectable()
export class AccountApp {
  constructor(private readonly userService: UserService) {}

  async findOneWithRoles(id: string): Promise<IUser> {
    return await this.userService.findOneRelationRoles(id)
  }

  async update(id: string, req: AccountUpdateRequest): Promise<IUser> {
    const data = await this.userService.findOneByOrFail({ id })
    const dataUpdate = AccountUpdateRequest.dto(data, req)

    return await this.userService.save(dataUpdate)
  }
}
