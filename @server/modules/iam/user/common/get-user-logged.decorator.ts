import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IUser } from '../infrastructure/user.interface'

export const UserLogged = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<IUser> => {
    return await ctx.switchToHttp().getRequest().user
  },
)
