import {
  DashboardOutlined,
  IdcardOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { ERole } from '../../Modules/Iam/Role/Role.enum'

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
    key: Route.Dashboard,
    label: <Link to={Route.Dashboard}>Dashboard</Link>,
    icon: <DashboardOutlined />,
  },
]

const itemsRoleAdministrator: MenuItem[] =
  user?.role == ERole.Administrator
    ? [
        {
          key: 'Iam',
          label: 'Iam',
          icon: <IdcardOutlined />,
          children: [
            {
              key: Route.users,
              label: <Link to={Route.users}>User</Link>,
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
