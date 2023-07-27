import { BellFilled } from '@ant-design/icons'
import { Link, Route } from 'react-router-dom'
import { MenuItem } from '../../../Layouts/LayoutMain/LayoutItems'
import { Util } from '../../../common/utils/util'
import PushNotificationDetail from './Pages/PushNotification.Detail'
import PushNotificationForm from './Pages/PushNotification.Form'
import PushNotificationIndex from './Pages/PushNotification.Index'
import { pushNotificationPath } from './infrastructure/push-notification.path'

const path = pushNotificationPath

class PushNotificationModule {
  static menuItems: MenuItem[] = [
    {
      key: path.index,
      label: <Link to={path.index}>{Util.titleCase('PushNotification')}</Link>,
      icon: <BellFilled />,
      permissions: [path.index],
    },
  ]

  static routes = [
    <Route
      key={path.index}
      path={path.index}
      element={<PushNotificationIndex />}
    />,
    <Route
      key={path.form}
      path={path.form}
      element={<PushNotificationForm />}
    />,
    <Route
      key={path.id()}
      path={path.id()}
      element={<PushNotificationForm />}
    />,
    <Route
      key={path.read.id()}
      path={path.read.id()}
      element={<PushNotificationDetail />}
    />,
  ]
}

export default PushNotificationModule
