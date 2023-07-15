import { FaIdCard } from 'react-icons/fa'
import { MenuItem } from '../../Layouts/LayoutMain/LayoutItems'
import { Path } from '../../common/Path'
import { AccountModule } from './Account/Account.Module'
import { PermissionModule } from './Permission/Permission.Module'
import { RoleModule } from './Role/Role.Module'
import isHasPermission from './Role/common/isHasPermission'
import { UserModule } from './User/User.Module'

export class IamModule {
  static menuItems: MenuItem[] = [
    {
      key: 'IAM',
      label: 'IAM',
      icon: <FaIdCard />,
      permissions: [Path.user.index, Path.role.index, Path.permission.index],
      children: [
        ...UserModule.menuItems,
        ...RoleModule.menuItems,
        ...PermissionModule.menuItems,
      ].filter((item) => isHasPermission(item.permissions)),
    },
  ]

  static routes = [
    ...AccountModule.routes,
    ...UserModule.routes,
    ...RoleModule.routes,
    ...PermissionModule.routes,
  ]
}

export default IamModule
