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
import { RoleEnum } from '../../../@server/modules/iam/role/common/role.enum'

import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'
import { authAction } from '../../Modules/Iam/Auth/infrastructure/auth.action'
import { Util } from '../../utils/util'

export type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

type MenuItem = Required<MenuProps>['items'][number]

const user = authAction.loggedUser()

const itemsRoleSuperAdmin: MenuItem[] = [RoleEnum.SuperAdmin].includes(
  user?.role,
)
  ? [
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
  : []

const itemsRoleAdmin: MenuItem[] = [
  RoleEnum.SuperAdmin,
  RoleEnum.Admin,
].includes(user?.role)
  ? [
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
              <Link to={Route.inventory.index}>
                {Util.titleCase('inventory')}
              </Link>
            ),
            icon: <ShoppingCartOutlined />,
          },
          {
            key: Route.category.index,
            label: (
              <Link to={Route.category.index}>
                {Util.titleCase('category')}
              </Link>
            ),
            icon: <TagsOutlined />,
          },
        ],
      },
    ]
  : []

const itemsRoleUser: MenuItem[] = [
  RoleEnum.SuperAdmin,
  RoleEnum.Admin,
  RoleEnum.User,
].includes(user?.role)
  ? [
      {
        key: Route.dashboard.index,
        label: <Link to={Route.dashboard.index}>DASHBOARD</Link>,
        icon: <DashboardOutlined />,
      },
    ]
  : []

export const layoutItems: MenuItem[] = [
  ...itemsRoleUser,
  ...itemsRoleAdmin,
  ...itemsRoleSuperAdmin,
]
