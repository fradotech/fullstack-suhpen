import { PushNotificationIndexFilterRequest } from '@server/modules/notification/push-notification/infrastructure/push-notification-index.request'
import { List } from 'antd'
import React from 'react'
import { PushNotificationAction } from '../../Modules/Notification/PushNotification/infrastructure/push-notification.action'
import { themeColors } from '../ThemeProvider/theme'

interface IProps {
  notificationCategoryKey: string
}

const LayoutNotificationContent: React.FC<IProps> = (props: IProps) => {
  const query = React.useMemo(() => {
    const query = {
      pageSize: 100000,
      filters: {
        category: [props.notificationCategoryKey],
      } as PushNotificationIndexFilterRequest,
    }

    props.notificationCategoryKey === 'All' && delete query.filters.category

    return query
  }, [props])

  const { data } = PushNotificationAction.useIndex(query)

  return (
    <List
      size="small"
      dataSource={data?.data}
      style={{ overflowY: 'scroll', height: '360px' }}
      renderItem={(data) => (
        <List.Item
          style={{
            backgroundColor: !data.readAt
              ? themeColors.primaryOpacity
              : undefined,
            padding: '10px',
            margin: '1px',
          }}
        >
          <List.Item.Meta title={data.title} />
          {data.message}
        </List.Item>
      )}
    />
  )
}

export default LayoutNotificationContent
