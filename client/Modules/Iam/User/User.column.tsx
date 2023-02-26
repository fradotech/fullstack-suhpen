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
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Role',
    key: 'role',
    render: (data: UserResponse) => {
      if (data.role == ERole.Administrator)
        return <Tag color="blue">{data.role}</Tag>
      else if (data.role == ERole.User)
        return <Tag color="green">{data.role}</Tag>

      return <Tag color="red">Error</Tag>
    },
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Created At',
    render: (data: UserResponse) => Utils.dateFormat(data.createdAt),
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
              confirm('Are you sure?') &&
                (await userAction.remove(data.id)) &&
                location.reload()
            },
          },
        ]}
      />
    ),
  },
]
