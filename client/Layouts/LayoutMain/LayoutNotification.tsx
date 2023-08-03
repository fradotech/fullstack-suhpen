import { INotificationPush } from '@server/modules/notification/notification-push/infrastructure/notification-push.interface'
import { Badge, Button, Dropdown, Row, Tabs, TabsProps, Typography } from 'antd'
import React from 'react'
import { FaBell } from 'react-icons/fa'
import { VscCheckAll } from 'react-icons/vsc'
import { NotificationCategoryAction } from '../../Modules/Notification/NotificationCategory/infrastructure/notification-category.action'
import { NotificationPushReadAction } from '../../Modules/Notification/NotificationPush/infrastructure/notification-push-read.action'
import { themeColors } from '../ThemeProvider/theme'
import LayoutNotificationContent from './LayoutNotificationContent'

const LayoutNotification: React.FC = () => {
  const { data: notificationPushs, refetch } =
    NotificationPushReadAction.useIndex()

  const handleReadAll = async (data: INotificationPush[] | undefined) => {
    const ids = data?.map((data) => data.id)
    ids && (await NotificationPushReadAction.readMany({ ids }))
    refetch()
  }

  const { data: notificationCategories } = NotificationCategoryAction.useIndex({
    pageSize: 1000,
  })

  const count = React.useMemo(() => {
    return notificationPushs?.data.filter((data) => {
      return !data.readAt
    }).length
  }, [notificationPushs])

  const categoriesDisplay: TabsProps['items'] = React.useMemo(() => {
    const data = [
      {
        key: 'All',
        label: 'All',
        children: (
          <LayoutNotificationContent
            notificationPushs={notificationPushs?.data}
            refetch={refetch}
          />
        ),
      },
    ]

    const categories = notificationCategories?.data.map((data) => ({
      key: data.id,
      label: data.name,
      children: (
        <LayoutNotificationContent
          notificationPushs={notificationPushs?.data.filter((notification) => {
            return notification.category.key === data.key
          })}
          refetch={refetch}
        />
      ),
    }))

    categories && data.push(...categories)

    return data
  }, [notificationPushs])

  return (
    <Dropdown
      trigger={['click']}
      overlayStyle={{ height: '400px', width: '400px' }}
      menu={{
        items: [
          {
            key: 'Mark Read All',
            type: 'group',
            label: (
              <Row style={{ marginTop: 10, justifyContent: 'space-between' }}>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Notifications
                </Typography.Title>
                <a onClick={() => handleReadAll(notificationPushs?.data)}>
                  <VscCheckAll style={{ marginRight: 6 }} />
                  Mark Read All
                </a>
              </Row>
            ),
          },
          {
            type: 'group',
            label: (
              <Tabs
                tabBarStyle={{ margin: 4 }}
                defaultActiveKey="All"
                items={categoriesDisplay}
                size="small"
              />
            ),
          },
        ],
      }}
    >
      <Badge
        color={themeColors.primary}
        count={count && count > 10 ? '9+' : count}
        offset={[-12, 6]}
        size="small"
      >
        <Button type="ghost" shape="circle" size="large" icon={<FaBell />} />
      </Badge>
    </Dropdown>
  )
}

export default LayoutNotification
