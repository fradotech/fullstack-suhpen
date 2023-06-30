import {
  ApartmentOutlined,
  DashboardOutlined,
  DropboxOutlined,
  IdcardOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Util } from '../../common/utils/util'
import { Route } from '../../Enums/Route'

export type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

type MenuItem = Required<MenuProps>['items'][number]

// TODO: Role guard
// const user = AuthAction.loggedUser()

const itemsRoleSuperAdmin: MenuItem[] = [
  { type: 'divider' },
  {
    key: 'IAM',
    label: 'IAM',
    icon: <IdcardOutlined />,
    children: [
      {
        key: Route.user.index,
        label: <Link to={Route.user.index}>{Util.titleCase('user')}</Link>,
        icon: <UsergroupAddOutlined />,
      },
      {
        key: Route.role,
        label: <Link to={Route.role}>{Util.titleCase('role')}</Link>,
        icon: <UserSwitchOutlined />,
      },
    ],
  },
]

const itemsRoleAdmin: MenuItem[] = [
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

const itemsRoleUser: MenuItem[] = [
  {
    key: Route.dashboard.index,
    label: <Link to={Route.dashboard.index}>DASHBOARD</Link>,
    icon: <DashboardOutlined />,
  },
]

export const layoutItems: MenuItem[] = [
  ...itemsRoleUser,
  ...itemsRoleAdmin,
  ...itemsRoleSuperAdmin,
]
