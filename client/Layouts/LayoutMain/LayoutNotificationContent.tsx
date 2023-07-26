import { IPushNotification } from '@server/modules/notification/push-notification/infrastructure/push-notification.interface'
import { List } from 'antd'
import React from 'react'
import { themeColors } from '../ThemeProvider/theme'

interface IProps {
  pushNotifications: IPushNotification[] | undefined
}

const LayoutNotificationContent: React.FC<IProps> = (props: IProps) => {
  return (
    <List
      size="small"
      dataSource={props.pushNotifications}
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
