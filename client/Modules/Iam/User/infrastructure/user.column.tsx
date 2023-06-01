import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { RoleEnum } from '../../../../../@server/modules/iam/role/common/role.enum'
import { RowActionButtons } from '../../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../../../Enums/Route'
import { Util } from '../../../../utils/util'
import { roleAction } from '../../Role/infrastructure/role.action'
import { userAction } from './user.action'

export const userColumns = (
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<IPaginateResponse<UserResponse>, unknown>>,
): ColumnsType<UserResponse> => {
  return [
    {
      dataIndex: 'name',
    },
    {
      dataIndex: 'email',
    },
    {
      dataIndex: 'role',
      render: (data: RoleEnum) => {
        return <Tag color={roleAction.colorRole(data)}>{data}</Tag>
      },
      filters: [
        { text: RoleEnum.SuperAdmin, value: RoleEnum.SuperAdmin },
        { text: RoleEnum.Admin, value: RoleEnum.Admin },
        { text: RoleEnum.User, value: RoleEnum.User },
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
      width: '120px',
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
                await userAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}
