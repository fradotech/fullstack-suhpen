import { Injectable } from '@nestjs/common'
import { IIamUser } from '../../user/infrastructure/user.interface'
import { UserService } from '../../user/infrastructure/user.service'
import { AccountUpdateRequest } from './account.request'

@Injectable()
export class AccountApp {
  constructor(private readonly userService: UserService) {}

  async findOneWithRoles(id: string): Promise<IIamUser> {
    return await this.userService.findOneOrFailRelationRoles(id)
  }

  async update(id: string, req: AccountUpdateRequest): Promise<IIamUser> {
    const data = await this.userService.findOneByOrFail({ id })
    const dataUpdate = AccountUpdateRequest.dto(data, req)

    return await this.userService.save(dataUpdate)
  }
}
