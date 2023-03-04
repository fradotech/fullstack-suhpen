import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../../Enums/Route'
import { Utils } from '../../../utils/utils'
import { ERole } from '../Role/Role.enum'
import { userAction } from './user.action'

export const usersColumns: ColumnsType<UserResponse> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: () => 0,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: () => 0,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Role',
    dataIndex: 'role',
    sorter: () => 0,
    sortDirections: ['ascend', 'descend'],
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
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    sorter: () => 0,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    sorter: () => 0,
    sortDirections: ['ascend', 'descend'],
    render: (data: Date) => Utils.dateFormat(data),
  },
  {
    title: 'Action',
    width: '75px',
    render: (data: UserResponse) => (
      <RowActionButtons
        actions={[
          {
            type: 'view',
            href: `${Route.Users}/${data.id}`,
          },
          {
            type: 'edit',
            href: `${Route.UserForm}/${data.id}`,
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
