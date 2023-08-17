import { AuthAction } from '../../Auth/infrastructure/auth.action'
import { RoleAction } from '../infrastructure/role.action'

const isHasPermission = (
  paths: string[],
  isNotMethodGet?: boolean,
): boolean => {
  const user = AuthAction.userLoggedLocal()

  for (const path of paths) {
    if (!isNotMethodGet) {
      const key = 'get' + path
      if (RoleAction.validatePermission(user, key)) return true
    }

    if (RoleAction.validatePermission(user, path)) return true
  }

  return false
}

export default isHasPermission
