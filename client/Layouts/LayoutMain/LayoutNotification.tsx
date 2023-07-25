import { Badge, Button, Dropdown, Tabs, TabsProps } from 'antd'
import React from 'react'
import { FaBell } from 'react-icons/fa'
import { NotificationCategoryAction } from '../../Modules/Notification/NotificationCategory/infrastructure/notification-category.action'
import { themeColors } from '../ThemeProvider/theme'
import LayoutNotificationContent from './LayoutNotificationContent'

const notificationCategories: TabsProps['items'] = [
  {
    key: 'All',
    label: 'All',
    children: <LayoutNotificationContent notificationCategoryKey="All" />,
  },
]

const LayoutNotification: React.FC = () => {
  const { data } = NotificationCategoryAction.useIndex({ pageSize: 100000 })

  const count = 10

  React.useMemo(() => {
    const categories = data?.data.map((data) => ({
      key: data.id,
      label: data.name,
      children: (
        <LayoutNotificationContent notificationCategoryKey={data.key} />
      ),
    }))

    categories && notificationCategories.push(...categories)
  }, [data])

  const markReadAll = () => undefined

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
                items={notificationCategories}
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
        offset={[-5, 10]}
        size="small"
      >
        <Button type="ghost" shape="circle" size="large" icon={<FaBell />} />
      </Badge>
    </Dropdown>
  )
}

export default LayoutNotification
