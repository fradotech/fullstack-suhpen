import { NotificationCategoryDefaultKeyEnum } from '../common/notification-category.enum'
import { NotificationCategoryCreateRequest } from '../v1/notification-category.request'

// <--- KEY: key --->
export const notificationCategoryDummies: NotificationCategoryCreateRequest[] =
  [
    {
      name: 'System',
      key: NotificationCategoryDefaultKeyEnum.System,
      labelColor: '#595959',
    },
    {
      name: 'Info',
      key: NotificationCategoryDefaultKeyEnum.Info,
      labelColor: '#0a1fe6',
    },
    {
      name: 'Promo',
      key: 'promo',
      labelColor: '#ff5100',
    },
    {
      name: 'Transaction',
      key: 'transaction',
      labelColor: '#00a120',
    },
  ]
