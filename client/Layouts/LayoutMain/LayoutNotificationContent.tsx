import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { IPushNotification } from '@server/modules/notification/push-notification/infrastructure/push-notification.interface'
import { PushNotificationResponse } from '@server/modules/notification/push-notification/infrastructure/push-notification.response'
import { Col, List } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { Link } from 'react-router-dom'
import { PushNotificationReadAction } from '../../Modules/Notification/PushNotification/infrastructure/push-notification-read.action'
import { Util } from '../../common/utils/util'
import { themeColors } from '../ThemeProvider/theme'

interface IProps {
  pushNotifications: IPushNotification[] | undefined
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<IApiRes<PushNotificationResponse[]>, unknown>
  >
}

const LayoutNotificationContent: React.FC<IProps> = (props: IProps) => {
  const handleReadOne = async (id: string) => {
    await PushNotificationReadAction.readOne({ id })
    props.refetch()
  }

  return (
    <List
      size="small"
      dataSource={props.pushNotifications}
      style={{ overflowY: 'scroll', height: '360px' }}
      renderItem={(data) => (
        <Link onClick={() => handleReadOne(data.id)} to={'#'}>
          <List.Item
            style={{
              backgroundColor: !data.readAt
                ? themeColors.primaryOpacity
                : undefined,
              padding: 10,
              margin: 1,
            }}
          >
            <Col>
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
        </Link>
      )}
    />
  )
}

export default LayoutNotificationContent
