import { PermissionMethodEnum } from '../common/permission.enum'

export const permissionDummies = [
  {
    key: 'public/get/dashboard',
    path: '/api/v1/dashboard',
    method: 'get',
    name: 'READ dashboard',
    module: 'dashboard',
    labelColor: PermissionMethodEnum.get.color,
  },
  {
    key: 'public/get/notification-categories',
    path: '/api/v1/notification-categories',
    method: 'get',
    name: 'READ notification-categories',
    module: 'notification-categories',
    labelColor: PermissionMethodEnum.get.color,
  },
]
