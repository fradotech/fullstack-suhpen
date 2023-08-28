import { MenuProps } from 'antd'
import DashboardModule from '../../Modules/Dashboard/Dashboard.Module'
import IamModule from '../../Modules/Iam/Iam.Module'
import isHasPermission from '../../Modules/Iam/Role/Components/isHasPermission'
import NotificationModule from '../../Modules/Notification/Notification.Module'
import SettingModule from '../../Modules/Setting/Setting.Module'

export type MenuItem = Required<MenuProps>['items'][number] & {
  label: React.ReactNode | string
  permissions: string[]
  children?: MenuItem[]
}

export const layoutItems: MenuItem[] = [
  ...DashboardModule.menuItems,
  ...IamModule.menuItems,
  ...NotificationModule.menuItems,
  ...SettingModule.menuItems,
].filter((item) => isHasPermission(item.permissions))
