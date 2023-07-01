import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IPermission } from '@server/modules/iam/permission/infrastructure/permission.interface'
import { PermissionResponse } from '@server/modules/iam/permission/infrastructure/permission.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { RowActionButtons } from '../../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../../../Enums/Route'
import { Util } from '../../../../common/utils/util'
import { PermissionAction } from './permission.action'

export const permissionColumns = (
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<
    QueryObserverResult<IPaginateResponse<PermissionResponse>, unknown>
  >,
): ColumnsType<PermissionResponse> => {
  return [
    {
      title: 'Name',
      render: (data: IPermission) => {
        return <Tag color={data.labelColor}>{data.name}</Tag>
      },
    },
    { dataIndex: 'module' },
    { dataIndex: 'method' },
    { dataIndex: 'path' },
    {
      title: 'Active',
      dataIndex: 'isActive',
      width: '1px',
      render: (data: boolean) =>
        data ? (
          <CheckCircleOutlined style={{ color: 'green' }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red' }} />
        ),
      filters: [
        { text: <CheckCircleOutlined style={{ color: 'green' }} />, value: 1 },
      ],
    },
    {
      dataIndex: 'createdAt',
      render: (data: Date) => Util.formatDate(data),
    },
    {
      title: 'Actions',
      width: '120px',
      render: (data: PermissionResponse) => (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: Route.permission.id(data.id),
            },
            {
              type: 'edit',
              href: Route.permission.edit(data.id),
            },
            {
              type: 'delete',
              onClick: async () => {
                await PermissionAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}
