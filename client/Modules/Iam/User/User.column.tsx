import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../../Enums/Route'
import { Util } from '../../../utils/util'
import { ERole } from '../Role/common/Role.enum'
import { userAction } from './user.action'

export const userColumns: ColumnsType<UserResponse> = [
  {
    dataIndex: 'name',
  },
  {
    dataIndex: 'email',
  },
  {
    dataIndex: 'role',
    render: (data: string) => {
      if (data == ERole.Administrator) return <Tag color="blue">{data}</Tag>
      else if (data == ERole.User) return <Tag color="green">{data}</Tag>

      return <Tag color="red">Error</Tag>
    },
    filters: [
      { text: ERole.Administrator, value: ERole.Administrator },
      { text: ERole.User, value: ERole.User },
    ],
  },
  {
    dataIndex: 'phoneNumber',
  },
  {
    dataIndex: 'createdAt',
    render: (data: Date) => Util.formatDate(data),
  },
  {
    title: 'Actions',
    width: '75px',
    render: (data: UserResponse) => (
      <RowActionButtons
        actions={[
          {
            type: 'view',
            href: Route.user.id(data.id),
          },
          {
            type: 'edit',
            href: Route.user.edit(data.id),
          },
          {
            type: 'delete',
            onClick: async () => {
              ;(await userAction.remove(data.id)) && location.reload()
            },
          },
        ]}
      />
    ),
  },
]
