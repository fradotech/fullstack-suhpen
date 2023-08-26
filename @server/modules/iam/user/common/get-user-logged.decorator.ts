import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IIamUser } from '../infrastructure/user.interface'

export const UserLogged = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<IIamUser> => {
    return await ctx.switchToHttp().getRequest().user
  },
)
