import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { INotificationCategory } from '@server/modules/notification/notification-category/infrastructure/notification-category.interface'
import { NotificationCategoryResponse } from '@server/modules/notification/notification-category/infrastructure/notification-category.response'
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
import { NotificationCategoryAction } from './notification-category.action'

export const notificationCategoryColumns = (
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<
    QueryObserverResult<
      IPaginateResponse<NotificationCategoryResponse>,
      unknown
    >
  >,
): ColumnsType<NotificationCategoryResponse> => {
  return [
    {
      key: 'name',
      title: 'Name',
      render: (data: INotificationCategory) => {
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
      render: (data: NotificationCategoryResponse) => (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: Path.notificationCategory.id(data.id),
            },
            {
              type: 'delete',
              onClick: async () => {
                await NotificationCategoryAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}
