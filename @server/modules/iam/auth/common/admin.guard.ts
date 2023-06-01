import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RoleEnum } from '@server/modules/iam/role/common/role.enum'

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: Error, user: any) {
    if (err || !user) throw err || new UnauthorizedException()
    if (user.role != RoleEnum.SuperAdmin && user.role != RoleEnum.Admin)
      throw err || new ForbiddenException()

    return user
  }
}
