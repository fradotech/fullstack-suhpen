import { MenuProps } from 'antd'
import { DashboardModule } from '../../Modules/Dashboard/Dashboard.Module'
import IamModule from '../../Modules/Iam/Iam.route'
import isHasPermission from '../../Modules/Iam/Role/common/isHasPermission'

export type MenuItem = Required<MenuProps>['items'][number] & {
  permissions: string[]
  children?: MenuItem[]
}

export const layoutItems: MenuItem[] = [
  ...DashboardModule.menuItems,
  ...IamModule.menuItems,
].filter((item) => isHasPermission(item.permissions))
