import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { INotificationCategory } from '@server/modules/notification/notification-category/infrastructure/notification-category.interface'
import { NotificationTemplateResponse } from '@server/modules/notification/notification-template/infrastructure/notification-template.response'
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
import { NotificationTemplateAction } from './notification-template.action'

export const notificationTemplateColumns = (
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<
    QueryObserverResult<
      IPaginateResponse<NotificationTemplateResponse>,
      unknown
    >
  >,
): ColumnsType<NotificationTemplateResponse> => {
  return [
    {
      dataIndex: 'title',
    },
    {
      dataIndex: 'category',
      render: (data: INotificationCategory) =>
        data && (
          <Tag key={data.id} color={data.labelColor}>
            {data.name}
          </Tag>
        ),
    },
    {
      dataIndex: 'createdAt',
      render: (data: Date) => Util.formatDate(data),
    },
    {
      title: 'Actions',
      width: '80px',
      render: (data: NotificationTemplateResponse) => (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: Path.notificationTemplate.id(data.id),
            },
            {
              type: 'delete',
              onClick: async () => {
                await NotificationTemplateAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}
