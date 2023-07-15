import { DashboardOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import { FaIdCard, FaKey, FaUser, FaUserCog } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import isHasPermission from '../../Modules/Iam/Role/common/isHasPermission'
import { Path } from '../../common/Path'
import { Util } from '../../common/utils/util'

type MenuItem = Required<MenuProps>['items'][number] & {
  permissions: string[]
  children?: MenuItem[]
}

const titleCase = Util.titleCase

const itemsDashboard: MenuItem[] = [
  {
    key: Path.dashboard.index,
    label: <Link to={Path.dashboard.index}>DASHBOARD</Link>,
    icon: <DashboardOutlined />,
    permissions: [Path.account.index],
  },
]

const itemsIam: MenuItem[] = [
  {
    type: 'divider',
    permissions: [Path.user.index, Path.role.index, Path.permission.index],
  },
  {
    key: 'IAM',
    label: 'IAM',
    icon: <FaIdCard />,
    permissions: [Path.user.index, Path.role.index, Path.permission.index],
    children: [
      {
        key: Path.user.index,
        label: <Link to={Path.user.index}>{titleCase('user')}</Link>,
        icon: <FaUser />,
        permissions: [Path.user.index],
      },
      {
        key: Path.role.index,
        label: <Link to={Path.role.index}>{titleCase('role')}</Link>,
        icon: <FaUserCog />,
        permissions: [Path.role.index],
      },
      {
        key: Path.permission.index,
        label: (
          <Link to={Path.permission.index}>{titleCase('permission')}</Link>
        ),
        icon: <FaKey />,
        permissions: [Path.permission.index],
      },
    ].filter((item) => isHasPermission(item.permissions)),
  },
]

export const layoutItems: MenuItem[] = [...itemsDashboard, ...itemsIam].filter(
  (item) => isHasPermission(item.permissions),
)
