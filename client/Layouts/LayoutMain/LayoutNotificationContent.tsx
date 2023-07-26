import { IPushNotification } from '@server/modules/notification/push-notification/infrastructure/push-notification.interface'
import { Col, List } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React from 'react'
import { Util } from '../../common/utils/util'
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
            padding: 10,
            margin: 1,
          }}
        >
          <Col sm={24} md={22}>
            <List.Item.Meta title={data.title} />
            <Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>
              {data.message}
            </Paragraph>
            <Col style={{ opacity: '0.5', marginTop: 2 }}>
              {data.pushAt && Util.formatDatetime(data.pushAt)} •{' '}
              {data.category.name}
            </Col>
          </Col>
        </List.Item>
      )}
    />
  )
}

export default LayoutNotificationContent
