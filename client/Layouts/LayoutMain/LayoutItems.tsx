import {
  ApartmentOutlined,
  CodepenCircleOutlined,
  ContactsOutlined,
  DashboardOutlined,
  DropboxOutlined,
  HomeOutlined,
  IdcardOutlined,
  LineChartOutlined,
  NodeExpandOutlined,
  ReconciliationOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import { ERole } from '../../Modules/Iam/Role/Role.enum'

import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'
import { authAction } from '../../Modules/Iam/Auth/auth.action'
import { Util } from '../../utils/util'

export type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

type MenuItem = Required<MenuProps>['items'][number]

const user = authAction.loggedUser()

const itemsRoleSuperAdmin: MenuItem[] = [ERole.SuperAdmin].includes(user?.role)
  ? [
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

const itemsRoleAdmin: MenuItem[] = [ERole.SuperAdmin, ERole.Admin].includes(
  user?.role,
)
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
          {
            key: 'Route.orderIn.index',
            label: (
              <Link to={'Route.orderIn.index'}>
                {Util.titleCase('orderIn')}
              </Link>
            ),
            icon: <VerticalAlignBottomOutlined />,
          },
          {
            key: 'Route.supplier.index',
            label: (
              <Link to={'Route.supplier.index'}>
                {Util.titleCase('supplier')}
              </Link>
            ),
            icon: <ContactsOutlined />,
          },
        ],
      },
      {
        key: 'Logistic',
        label: 'Logistic',
        icon: <CodepenCircleOutlined />,
        children: [
          {
            key: 'Route.warehouse.index',
            label: (
              <Link to={'Route.warehouse.index'}>
                {Util.titleCase('warehouse')}
              </Link>
            ),
            icon: <HomeOutlined />,
          },
          {
            key: 'Route.deliver.index',
            label: (
              <Link to={'Route.deliver.index'}>
                {Util.titleCase('deliver')}
              </Link>
            ),
            icon: <NodeExpandOutlined />,
          },
          {
            key: 'Route.store.index',
            label: (
              <Link to={'Route.store.index'}>{Util.titleCase('store')}</Link>
            ),
            icon: <ShopOutlined />,
          },
        ],
      },
    ]
  : []

const itemsRoleUser: MenuItem[] = [
  ERole.SuperAdmin,
  ERole.Admin,
  ERole.User,
].includes(user?.role)
  ? [
      {
        key: Route.dashboard.index,
        label: (
          <Link to={Route.dashboard.index}>{Util.titleCase('dashboard')}</Link>
        ),
        icon: <DashboardOutlined />,
      },
      {
        key: 'POS',
        label: 'POS',
        icon: <ReconciliationOutlined />,
        children: [
          {
            key: 'Route.orderOut.index',
            label: (
              <Link to={'Route.orderOut.index'}>
                {Util.titleCase('orderOut')}
              </Link>
            ),
            icon: <VerticalAlignTopOutlined />,
          },
          {
            key: 'Route.recapitulation.index',
            label: (
              <Link to={'Route.recapitulation.index'}>
                {Util.titleCase('recapitulation')}
              </Link>
            ),
            icon: <LineChartOutlined />,
          },
        ],
      },
    ]
  : []

export const layoutItems: MenuItem[] = [
  ...itemsRoleUser,
  ...itemsRoleAdmin,
  ...itemsRoleSuperAdmin,
]
