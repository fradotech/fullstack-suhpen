import { BellFilled } from '@ant-design/icons'
import { Link, Route } from 'react-router-dom'
import { MenuItem } from '../../../Layouts/LayoutMain/LayoutItems'
import { Util } from '../../../common/utils/util'
import NotificationPushDetail from './Pages/NotificationPush.Detail'
import NotificationPushForm from './Pages/NotificationPush.Form'
import NotificationPushIndex from './Pages/NotificationPush.Index'
import { notificationPushPath } from './infrastructure/notification-push.path'

const path = notificationPushPath

class NotificationPushModule {
  static menuItems: MenuItem[] = [
    {
      key: path.index,
      label: <Link to={path.index}>{Util.titleCase('push')}</Link>,
      icon: <BellFilled />,
      permissions: [path.index],
    },
  ]

  static routes = [
    <Route
      key={path.index}
      path={path.index}
      element={<NotificationPushIndex />}
    />,
    <Route
      key={path.form}
      path={path.form}
      element={<NotificationPushForm />}
    />,
    <Route
      key={path.id()}
      path={path.id()}
      element={<NotificationPushForm />}
    />,
    <Route
      key={path.read.id()}
      path={path.read.id()}
      element={<NotificationPushDetail />}
    />,
  ]
}

export default NotificationPushModule
