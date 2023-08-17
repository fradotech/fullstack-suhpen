import { MenuProps } from 'antd'
import DashboardModule from '../../Modules/Dashboard/Dashboard.Module'
import IamModule from '../../Modules/Iam/Iam.Module'
import isHasPermission from '../../Modules/Iam/Role/Components/isHasPermission'
import NotificationModule from '../../Modules/Notification/Notification.Module'

export type MenuItem = Required<MenuProps>['items'][number] & {
  label: React.ReactNode | string
  permissions: string[]
  children?: MenuItem[]
}

export const layoutItems: MenuItem[] = [
  ...DashboardModule.menuItems,
  ...IamModule.menuItems,
  ...NotificationModule.menuItems,
].filter((item) => isHasPermission(item.permissions))
