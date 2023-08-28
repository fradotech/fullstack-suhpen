import { dashboardPath } from '../Modules/Dashboard/infrastructure/dashboard.path'
import { accountPath } from '../Modules/Iam/Account/infrastructure/account.path'
import { authPath } from '../Modules/Iam/Auth/infrastructure/auth.path'
import { permissionPath } from '../Modules/Iam/Permission/infrastructure/permission.path'
import { rolePath } from '../Modules/Iam/Role/infrastructure/role.path'
import { userPath } from '../Modules/Iam/User/infrastructure/user.path'
import { notificationCategoryPath } from '../Modules/Notification/NotificationCategory/infrastructure/notification-category.path'
import { notificationPushPath } from '../Modules/Notification/NotificationPush/infrastructure/notification-push.path'
import { notificationTemplatePath } from '../Modules/Notification/NotificationTemplate/infrastructure/notification-template.path'
import { logActivityPath } from '../Modules/Setting/NotificationCategory/infrastructure/log-activity.path'

export const Path = {
  Home: '/',
  Attachment: '/attachments',
  dashboard: dashboardPath,

  // --- Iam --- \\

  ...authPath,
  account: accountPath,
  user: userPath,
  role: rolePath,
  permission: permissionPath,

  // --- Notification --- \\

  notificationPush: notificationPushPath,
  notificationCategory: notificationCategoryPath,
  notificationTemplate: notificationTemplatePath,

  // --- Setting --- \\

  logActivity: logActivityPath,
}
