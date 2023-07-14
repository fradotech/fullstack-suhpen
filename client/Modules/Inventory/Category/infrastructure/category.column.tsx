import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { CategoryResponse } from '@server/modules/inventory/category/infrastructure/category.response'
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
import { CategoryAction } from './category.action'

export const categoryColumns = (
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<
    QueryObserverResult<IPaginateResponse<CategoryResponse>, unknown>
  >,
): ColumnsType<CategoryResponse> => {
  return [
    {
      title: 'name',
      render: (data: CategoryResponse) => {
        return <Tag color={data.labelColor}>{data.name}</Tag>
      },
    },
    { dataIndex: 'description' },
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
      width: '80px',
      render: (data: CategoryResponse) => (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: Path.category.id(data.id),
            },
            {
              type: 'delete',
              onClick: async () => {
                await CategoryAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}
