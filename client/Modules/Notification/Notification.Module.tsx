import { NotificationFilled } from '@ant-design/icons'
import { MenuItem } from '../../Layouts/LayoutMain/LayoutItems'
import { Path } from '../../common/Path'
import isHasPermission from '../Iam/Role/common/isHasPermission'
import NotificationCategoryModule from './NotificationCategory/NotificationCategory.Module'
import NotificationTemplateModule from './NotificationTemplate/NotificationTemplate.Module'
import PushNotificationModule from './PushNotification/PushNotification.Module'

export class NotificationModule {
  static menuItems: MenuItem[] = [
    {
      key: 'NOTIFICATION',
      label: 'NOTIFICATION',
      icon: <NotificationFilled />,
      permissions: [Path.user.index],
      children: [
        ...PushNotificationModule.menuItems,
        ...NotificationTemplateModule.menuItems,
        ...NotificationCategoryModule.menuItems,
      ].filter((item) => isHasPermission(item.permissions)),
    },
  ]

  static routes = [
    ...PushNotificationModule.routes,
    ...NotificationTemplateModule.routes,
    ...NotificationCategoryModule.routes,
  ]
}

export default NotificationModule
