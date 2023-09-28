import { NotificationFilled } from '@ant-design/icons'
import { MenuItem } from '../../Layouts/LayoutMain/LayoutItems'
import { Path } from '../../common/Path'
import isHasPermission from '../Iam/Role/Components/isHasPermission'
import NotificationCategoryModule from './NotificationCategory/NotificationCategory.Module'
import NotificationPushModule from './NotificationPush/NotificationPush.Module'
import NotificationTemplateModule from './NotificationTemplate/NotificationTemplate.Module'

export class NotificationModule {
  static menuItems: MenuItem[] = [
    {
      key: 'Notification',
      label: <strong>Notification</strong>,
      icon: <NotificationFilled />,
      permissions: [Path.user.index],
      children: [
        ...NotificationPushModule.menuItems,
        ...NotificationTemplateModule.menuItems,
        ...NotificationCategoryModule.menuItems,
      ].filter((item) => isHasPermission(item.permissions)),
    },
  ]

  static routes = [
    ...NotificationPushModule.routes,
    ...NotificationTemplateModule.routes,
    ...NotificationCategoryModule.routes,
  ]
}

export default NotificationModule
