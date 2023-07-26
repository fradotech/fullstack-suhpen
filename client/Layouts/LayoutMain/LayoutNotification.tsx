import { Badge, Button, Dropdown, Tabs, TabsProps } from 'antd'
import React from 'react'
import { FaBell } from 'react-icons/fa'
import { NotificationCategoryAction } from '../../Modules/Notification/NotificationCategory/infrastructure/notification-category.action'
import { PushNotificationAction } from '../../Modules/Notification/PushNotification/infrastructure/push-notification.action'
import { themeColors } from '../ThemeProvider/theme'
import LayoutNotificationContent from './LayoutNotificationContent'

const LayoutNotification: React.FC = () => {
  const { data: pushNotifications } = PushNotificationAction.useIndex({
    pageSize: 100000,
  })

  const markReadAll = () => undefined

  const { data: notificationCategories } = NotificationCategoryAction.useIndex({
    pageSize: 100000,
  })

  const count = React.useMemo(() => {
    return pushNotifications?.data.filter((data) => {
      return !data.readAt
    }).length
  }, [pushNotifications])

  const categoriesDisplay: TabsProps['items'] = React.useMemo(() => {
    const data = [
      {
        key: 'All',
        label: 'All',
        children: (
          <LayoutNotificationContent
            pushNotifications={pushNotifications?.data}
          />
        ),
      },
    ]

    const categories = notificationCategories?.data.map((data) => ({
      key: data.id,
      label: data.name,
      children: (
        <LayoutNotificationContent
          pushNotifications={pushNotifications?.data.filter((notification) => {
            return notification.category.key === data.key
          })}
        />
      ),
    }))

    categories && data.push(...categories)

    return data
  }, [pushNotifications])

  return (
    <Dropdown
      trigger={['click']}
      overlayStyle={{ height: '400px', width: '400px' }}
      menu={{
        items: [
          {
            type: 'group',
            label: (
              <Tabs
                tabBarStyle={{ margin: '4px' }}
                defaultActiveKey="All"
                items={categoriesDisplay}
                size="small"
              />
            ),
          },
          {
            type: 'divider',
          },
          {
            key: 'Mark Read All',
            type: 'group',
            label: (
              <Button type="ghost" onClick={markReadAll} size="small">
                {`Mark Read All (${count})`}
              </Button>
            ),
          },
        ],
      }}
    >
      <Badge
        color={themeColors.primary}
        count={count}
        offset={[-12, 10]}
        size="small"
      >
        <Button type="ghost" shape="circle" size="large" icon={<FaBell />} />
      </Badge>
    </Dropdown>
  )
}

export default LayoutNotification
