import {
  ApartmentOutlined,
  DashboardOutlined,
  DropboxOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import React from 'react'
import { FaIdCard, FaUser, FaUserCog, FaUserShield } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Path } from '../../common/Path'
import { Util } from '../../common/utils/util'

export type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

type MenuItem = Required<MenuProps>['items'][number]

// TODO: Role guard
// const user = AuthAction.loggedUser()

const itemsDashboard: MenuItem[] = [
  {
    key: Path.dashboard.index,
    label: <Link to={Path.dashboard.index}>DASHBOARD</Link>,
    icon: <DashboardOutlined />,
  },
]
const itemsFeature: MenuItem[] = [
  {
    key: 'SCM',
    label: 'SCM',
    icon: <ApartmentOutlined />,
    children: [
      {
        key: Path.product.index,
        label: <Link to={Path.product.index}>{Util.titleCase('product')}</Link>,
        icon: <DropboxOutlined />,
      },
      {
        key: Path.inventory.index,
        label: (
          <Link to={Path.inventory.index}>{Util.titleCase('inventory')}</Link>
        ),
        icon: <ShoppingCartOutlined />,
      },
      {
        key: Path.category.index,
        label: (
          <Link to={Path.category.index}>{Util.titleCase('category')}</Link>
        ),
        icon: <TagsOutlined />,
      },
    ],
  },
]

const itemsIam: MenuItem[] = [
  { type: 'divider' },
  {
    key: 'IAM',
    label: 'IAM',
    icon: <FaIdCard />,
    children: [
      {
        key: Path.user.index,
        label: <Link to={Path.user.index}>{Util.titleCase('user')}</Link>,
        icon: <FaUser />,
      },
      {
        key: Path.role.index,
        label: <Link to={Path.role.index}>{Util.titleCase('role')}</Link>,
        icon: <FaUserCog />,
      },
      {
        key: Path.permission.index,
        label: (
          <Link to={Path.permission.index}>{Util.titleCase('permission')}</Link>
        ),
        icon: <FaUserShield />,
      },
    ],
  },
]

export const layoutItems: MenuItem[] = [
  ...itemsDashboard,
  ...itemsFeature,
  ...itemsIam,
]
