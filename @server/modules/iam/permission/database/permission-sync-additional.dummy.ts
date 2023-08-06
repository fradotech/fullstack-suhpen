import {
  PermissionMethodEnum,
  PermissionMethodValue,
} from '../common/permission.enum'
import { PermissionCreateRequest } from '../v1/permission.request'

export const permissionDummies: PermissionCreateRequest[] = [
  {
    key: 'get/dashboard',
    path: '/api/v1/dashboard',
    method: PermissionMethodEnum.Get,
    name: 'READ dashboard',
    module: 'dashboard',
    labelColor: PermissionMethodValue.get.color,
  },
  {
    key: 'public/get/notification-categories',
    path: '/api/v1/notification-categories',
    method: PermissionMethodEnum.Get,
    name: 'READ notification-categories',
    module: 'notification-categories',
    labelColor: PermissionMethodValue.get.color,
  },
]
