import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ERole } from 'client/Modules/Iam/Role/Role.enum'

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: Error, user: any) {
    if (err || !user) throw err || new UnauthorizedException()
    if (user.role != ERole.SuperAdmin && user.role != ERole.Admin)
      throw err || new ForbiddenException()

    return user
  }
}
