import { MenuItem } from '../../Layouts/LayoutMain/LayoutItems'
import { AccountModule } from './Account/Account.Module'
import { PermissionModule } from './Permission/Permission.Module'
import { RoleModule } from './Role/Role.Module'
import { UserModule } from './User/User.Module'

export class IamModule {
  static menuItems: MenuItem[] = [
    ...UserModule.menuItems,
    ...RoleModule.menuItems,
    ...PermissionModule.menuItems,
  ]

  static routes = [
    ...AccountModule.routes,
    ...UserModule.routes,
    ...RoleModule.routes,
    ...PermissionModule.routes,
  ]
}

export default IamModule
