import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ERole } from '@server/modules/iam/role/infrastructure/role.enum'

@Injectable()
export class SuperAdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: Error, user: any) {
    if (err || !user) throw err || new UnauthorizedException()
    if (user.role != ERole.SuperAdmin) throw err || new ForbiddenException()

    return user
  }
}
