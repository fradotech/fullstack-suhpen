import {
  DashboardOutlined,
  DropboxOutlined,
  KeyOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import {
  FaBoxes,
  FaDrawPolygon,
  FaIdCard,
  FaUser,
  FaUserCog,
} from 'react-icons/fa'
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
    permissions: [
      Path.dashboard.index,
      Path.variant.index,
      Path.dashboard.variant.aggregate(),
    ],
  },
]

const itemsFeature: MenuItem[] = [
  {
    key: 'INVENTORY',
    label: 'INVENTORY',
    icon: <FaBoxes />,
    permissions: [
      Path.dashboard.index,
      Path.variant.index,
      Path.dashboard.index,
    ],
    children: [
      {
        key: Path.product.index,
        label: <Link to={Path.product.index}>{titleCase('product')}</Link>,
        icon: <DropboxOutlined />,
        permissions: [Path.product.index],
      },
      {
        key: Path.variant.index,
        label: <Link to={Path.variant.index}>{titleCase('variant')}</Link>,
        icon: <FaDrawPolygon />,
        permissions: [Path.variant.index],
      },
      {
        key: Path.category.index,
        label: <Link to={Path.category.index}>{titleCase('category')}</Link>,
        icon: <TagsOutlined />,
        permissions: [Path.category.index],
      },
    ].filter((item) => isHasPermission(item.permissions)),
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
          <Link to={Path.permission.index}>{titleCase('permissions')}</Link>
        ),
        icon: <KeyOutlined />,
        permissions: [Path.permission.index],
      },
    ].filter((item) => isHasPermission(item.permissions)),
  },
]

export const layoutItems: MenuItem[] = [
  ...itemsDashboard,
  ...itemsFeature,
  ...itemsIam,
].filter((item) => isHasPermission(item.permissions))
