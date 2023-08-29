import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IRole } from '@server/modules/iam/role/infrastructure/role.interface'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
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
import { RoleAction } from './role.action'

export const roleColumns = (
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<IPaginateResponse<RoleResponse>, unknown>>,
): ColumnsType<RoleResponse> => {
  return [
    {
      title: 'Name',
      render: (data: IRole) => {
        return <Tag color={data.labelColor}>{data.name}</Tag>
      },
    },
    { dataIndex: 'key' },
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
        { text: <CloseCircleOutlined style={{ color: 'red' }} />, value: 0 },
      ],
    },
    {
      dataIndex: 'createdAt',
      render: (data: Date) => Util.formatDate(data),
    },
    {
      title: 'Actions',
      width: '80px',
      render: (data: RoleResponse) => (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: Path.role.id(data.id),
            },
            {
              type: 'delete',
              onClick: async () => {
                await RoleAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}
