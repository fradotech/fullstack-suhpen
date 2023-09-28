import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { INotificationPush } from '@server/modules/notification/notification-push/infrastructure/notification-push.interface'
import { NotificationPushResponse } from '@server/modules/notification/notification-push/infrastructure/notification-push.response'
import { Col, List } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import React, { useContext } from 'react'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { Link } from 'react-router-dom'
import { NotificationPushReadAction } from '../../Modules/Notification/NotificationPush/infrastructure/notification-push-read.action'
import { Path } from '../../common/Path'
import { Util } from '../../common/utils/util'
import { ThemeContext } from '../ThemeProvider/ThemeProvider'

type IProps = {
  notificationPushs: INotificationPush[] | undefined
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<IApiRes<NotificationPushResponse[]>, unknown>
  >
}

const LayoutNotificationContent: React.FC<IProps> = (props: IProps) => {
  const { themeColors } = useContext(ThemeContext)

  const handleReadOne = async (id: string) => {
    await NotificationPushReadAction.readOne({ id })
    props.refetch()
  }

  return (
    <List
      size="small"
      dataSource={props.notificationPushs}
      style={{ overflowY: 'scroll', height: '360px' }}
      renderItem={(data) => (
        <Link
          onClick={() => handleReadOne(data.id)}
          to={Path.notificationPush.read.id(data.id)}
        >
          <List.Item
            style={{
              backgroundColor: !data.readAt
                ? themeColors?.primaryOpacity
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
