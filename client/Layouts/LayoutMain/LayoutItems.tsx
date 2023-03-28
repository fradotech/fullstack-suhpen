import {
  ApartmentOutlined,
  DashboardOutlined,
  DropboxOutlined,
  IdcardOutlined,
  ShopOutlined,
  TagsOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { ERole } from '../../Modules/Iam/Role/common/Role.enum'

import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'
import { authAction } from '../../Modules/Iam/Auth/auth.action'

export type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

type MenuItem = Required<MenuProps>['items'][number]

const user = authAction.loggedUser()

const itemsRoleUser: MenuItem[] = [
  {
    key: Route.dashboard.index,
    label: <Link to={Route.dashboard.index}>Dashboard</Link>,
    icon: <DashboardOutlined />,
  },
]

const itemsRoleAdministrator: MenuItem[] =
  user?.role == ERole.Administrator
    ? [
        {
          key: 'SCM',
          label: 'SCM',
          icon: <ApartmentOutlined />,
          children: [
            {
              key: Route.inventory.index,
              label: <Link to={Route.inventory.index}>Inventory</Link>,
              icon: <ShopOutlined />,
            },
            {
              key: Route.product.index,
              label: <Link to={Route.product.index}>Product</Link>,
              icon: <DropboxOutlined />,
            },
            {
              key: Route.category.index,
              label: <Link to={Route.category.index}>Category</Link>,
              icon: <TagsOutlined />,
            },
          ],
        },
        {
          key: 'Iam',
          label: 'Iam',
          icon: <IdcardOutlined />,
          children: [
            {
              key: Route.user.index,
              label: <Link to={Route.user.index}>User</Link>,
              icon: <UsergroupAddOutlined />,
            },
            {
              key: Route.roles,
              label: <Link to={Route.roles}>Role</Link>,
              icon: <UserSwitchOutlined />,
            },
          ],
        },
      ]
    : []

export const layoutItems: MenuItem[] = [
  ...itemsRoleUser,
  ...itemsRoleAdministrator,
]
