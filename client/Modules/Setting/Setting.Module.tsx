import { SettingFilled } from '@ant-design/icons'
import { MenuItem } from '../../Layouts/LayoutMain/LayoutItems'
import { Path } from '../../common/Path'
import isHasPermission from '../Iam/Role/Components/isHasPermission'
import LogActivityModule from './NotificationCategory/LogActivity.Module'

export class SettingModule {
  static menuItems: MenuItem[] = [
    {
      key: 'SETTING',
      label: 'SETTING',
      icon: <SettingFilled />,
      permissions: [Path.user.index],
      children: [...LogActivityModule.menuItems].filter((item) =>
        isHasPermission(item.permissions),
      ),
    },
  ]

  static routes = [...LogActivityModule.routes]
}

export default SettingModule
