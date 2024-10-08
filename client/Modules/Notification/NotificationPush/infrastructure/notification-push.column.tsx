import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { INotificationCategory } from '@server/modules/notification/notification-category/infrastructure/notification-category.interface'
import { NotificationCategoryResponse } from '@server/modules/notification/notification-category/infrastructure/notification-category.response'
import { NotificationPushResponse } from '@server/modules/notification/notification-push/infrastructure/notification-push.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { Link } from 'react-router-dom'
import { RowActionButtons } from '../../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Path } from '../../../../common/Path'
import { Util } from '../../../../common/utils/util'
import { NotificationPushAction } from './notification-push.action'

export const notificationPushColumns = (
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<
    QueryObserverResult<IPaginateResponse<NotificationPushResponse>, unknown>
  >,
  optionsNotificationCategory: NotificationCategoryResponse[] | undefined,
): ColumnsType<NotificationPushResponse> => {
  return [
    { dataIndex: 'title' },
    {
      dataIndex: 'user',
      render: (data: IUser) => {
        return data && <Link to={Path.user.id(data.id)}>{data.name}</Link>
      },
    },
    {
      title: 'Broadcast',
      dataIndex: 'isBroadcast',
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
      dataIndex: 'category',
      render: (data: INotificationCategory) =>
        data && (
          <Tag key={data.id} color={data.labelColor}>
            {data.name}
          </Tag>
        ),
      filters: optionsNotificationCategory?.map((data) => {
        return {
          text: data.name,
          value: data.name,
        }
      }),
    },
    {
      dataIndex: 'pushAt',
      render: (data: Date) => Util.formatDatetime(data),
    },
    {
      dataIndex: 'readAt',
      render: (data: Date) => Util.formatDatetime(data),
    },
    {
      dataIndex: 'createdAt',
      render: (data: Date) => Util.formatDate(data),
    },
    {
      title: 'Actions',
      width: '80px',
      render: (data: NotificationPushResponse) => (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: Path.notificationPush.id(data.id),
            },
            {
              type: 'delete',
              onClick: async () => {
                await NotificationPushAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}
