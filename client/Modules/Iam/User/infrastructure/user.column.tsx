import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IRole } from '@server/modules/iam/role/infrastructure/role.interface'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { RowActionButtons } from '../../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Path } from '../../../../common/Path'
import { Util } from '../../../../common/utils/util'
import { UserAction } from './user.action'

export const userColumns = (
  optionsRole: RoleResponse[] | undefined,
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
      dataIndex: 'roles',
      render: (data: IRole[]) => {
        return data?.map((data) => {
          return (
            <Tag key={data.id} color={data.labelColor}>
              {data.name}
            </Tag>
          )
        })
      },
      filters: optionsRole?.map((data) => {
        return {
          text: data.name,
          value: data.name,
        }
      }),
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
              href: Path.user.id(data.id),
            },
            {
              type: 'edit',
              href: Path.user.edit(data.id),
            },
            {
              type: 'delete',
              onClick: async () => {
                await UserAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}
