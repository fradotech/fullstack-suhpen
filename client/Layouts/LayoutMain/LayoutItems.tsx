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
import { Route } from '../../Enums/Route'
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
    key: Route.dashboard.index,
    label: <Link to={Route.dashboard.index}>DASHBOARD</Link>,
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
        key: Route.product.index,
        label: (
          <Link to={Route.product.index}>{Util.titleCase('product')}</Link>
        ),
        icon: <DropboxOutlined />,
      },
      {
        key: Route.inventory.index,
        label: (
          <Link to={Route.inventory.index}>{Util.titleCase('inventory')}</Link>
        ),
        icon: <ShoppingCartOutlined />,
      },
      {
        key: Route.category.index,
        label: (
          <Link to={Route.category.index}>{Util.titleCase('category')}</Link>
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
        key: Route.user.index,
        label: <Link to={Route.user.index}>{Util.titleCase('user')}</Link>,
        icon: <FaUser />,
      },
      {
        key: Route.role.index,
        label: <Link to={Route.role.index}>{Util.titleCase('role')}</Link>,
        icon: <FaUserCog />,
      },
      {
        key: Route.permission.index,
        label: (
          <Link to={Route.permission.index}>
            {Util.titleCase('permission')}
          </Link>
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
