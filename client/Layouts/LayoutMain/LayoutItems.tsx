import { MenuProps } from 'antd'
import DashboardModule from '../../Modules/Dashboard/Dashboard.Module'

export type MenuItem = Required<MenuProps>['items'][number] & {
  label: React.ReactNode | string
  permissions: string[]
  children?: MenuItem[]
}

export const layoutItems: MenuItem[] = [
  ...DashboardModule.menuItems,
  // ...IamModule.menuItems,
  // ...NotificationModule.menuItems,
  // ...SettingModule.menuItems,
]
// .filter((item) => isHasPermission(item.permissions))
