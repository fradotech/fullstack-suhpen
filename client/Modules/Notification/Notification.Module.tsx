import { FaBell } from 'react-icons/fa'
import { MenuItem } from '../../Layouts/LayoutMain/LayoutItems'
import { Path } from '../../common/Path'
import isHasPermission from '../Iam/Role/common/isHasPermission'
import NotificationCategoryModule from './NotificationCategory/NotificationCategory.Module'

export class NotificationModule {
  static menuItems: MenuItem[] = [
    {
      key: 'NOTIFICATION',
      label: 'NOTIFICATION',
      icon: <FaBell />,
      permissions: [Path.user.index],
      children: [...NotificationCategoryModule.menuItems].filter((item) =>
        isHasPermission(item.permissions),
      ),
    },
  ]

  static routes = [...NotificationCategoryModule.routes]
}

export default NotificationModule
