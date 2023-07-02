import { AuthAction } from '../../Auth/infrastructure/auth.action'
import { RoleAction } from '../infrastructure/role.action'

const isHasPermission = (paths: string[]): boolean => {
  const user = AuthAction.userLoggedLocal()
  return paths.some((path) => RoleAction.validatePermission(user, path))
}

export default isHasPermission
