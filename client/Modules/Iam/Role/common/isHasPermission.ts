import { PermissionMethodEnum } from '../../../../../@server/modules/iam/permission/common/permission.enum'
import { Modules } from '../../../../../@server/modules/modules'
import { AuthAction } from '../../Auth/infrastructure/auth.action'
import { RoleAction } from '../infrastructure/role.action'

const isHasPermission = (
  paths: string[],
  isNotMethodGet?: boolean,
): boolean => {
  const user = AuthAction.userLoggedLocal()

  const module = Object.values(Modules).find((module) => {
    return location.pathname.includes(module)
  })

  for (const path of paths) {
    if (!isNotMethodGet) {
      const key = 'get' + path
      if (RoleAction.validatePermission(user, key)) return true
    }

    let key: string

    if (!path) {
      key = `${PermissionMethodEnum.delete.name}/${module}/:id`
    } else if (path.includes('save')) {
      key = `${PermissionMethodEnum.put.name}/${module}/:id`
    } else {
      key = `${PermissionMethodEnum.get.name}/${module}/:id`
    }

    if (RoleAction.validatePermission(user, key)) return true
  }

  return false
}

export default isHasPermission
