import { AuthAction } from '../../Auth/infrastructure/auth.action'
import { RoleAction } from '../infrastructure/role.action'

const isHasPermission = (paths: string[]): boolean => {
  const user = AuthAction.userLoggedLocal()

  for (const path of paths) {
    if (!RoleAction.validatePermission(user, path)) return false
  }

  return true
}

export default isHasPermission
