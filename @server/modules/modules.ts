export enum Modules {
  Doc = 'docs',
  Log = 'logs',
  Attachment = 'attachments',

  // --- Dashboard --- \\

  Dashboard = 'dashboard',
  DashboardUser = `dashboard/users`,

  // --- Iam --- \\

  Auth = 'auth',

  User = 'users',
  UserSheet = 'users/sheet',

  Role = 'roles',
  RoleSheet = 'roles/sheet',

  Permission = 'permissions',
  PermissionSheet = 'permissions/sheet',

  Account = 'account',

  // --- Notification --- \\

  PushNotification = 'push-notifications',
  PushNotificationSheet = 'push-notifications/sheet',
  PushNotificationRead = 'push-notifications/read',

  NotificationTemplate = 'notification-templates',
  NotificationTemplateSheet = 'notification-templates/sheet',

  NotificationCategory = 'notification-categories',
  NotificationCategorySheet = 'notification-categories/sheet',
}
