import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Exception } from '@server/common/exceptions/index.exception'
import { RoleService } from '../../role/infrastructure/role.service'

@Injectable()
export class LoggedInGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) throw err || Exception.unauthorized()

    const isHasPermission = RoleService.validatePermission(
      user,
      context.switchToHttp().getRequest().route.path,
    )

    if (!isHasPermission) {
      // TODO: enable
      // throw Exception.forbidden()
    }

    return user
  }
}
