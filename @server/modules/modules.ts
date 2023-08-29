export enum Modules {
  Doc = 'docs',
  Log = 'logs',
  LogSheet = 'logs/sheet',
  Attachment = 'attachments',

  // --- Dashboard --- \\

  Dashboard = 'dashboard',
  DashboardUser = `dashboard/users`,

  // --- Region --- \\

  Province = 'provinces',
  ProvinceSheet = 'provinces/sheet',

  Regency = 'regencies',
  RegencySheet = 'regencies/sheet',

  District = 'districts',
  DistrictSheet = 'districts/sheet',

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

  NotificationPush = 'notification-pushs',
  NotificationPushSheet = 'notification-pushs/sheet',
  NotificationPushRead = 'notification-pushs/read',

  NotificationTemplate = 'notification-templates',
  NotificationTemplateSheet = 'notification-templates/sheet',

  NotificationCategory = 'notification-categories',
  NotificationCategorySheet = 'notification-categories/sheet',
}
