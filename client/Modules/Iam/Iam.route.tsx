import AccountModule from './Account/Account.module'
import PermissionRoute from './Permission/permission.route'
import RoleRoute from './Role/role.route'
import UserRoute from './User/user.route'

export default [
  ...AccountModule,
  ...UserRoute,
  ...RoleRoute,
  ...PermissionRoute,
]
