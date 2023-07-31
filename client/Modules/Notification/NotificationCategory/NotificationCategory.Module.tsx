import { FaTag } from 'react-icons/fa'
import { Link, Route } from 'react-router-dom'
import { MenuItem } from '../../../Layouts/LayoutMain/LayoutItems'
import { Util } from '../../../common/utils/util'
import NotificationCategoryForm from './Pages/NotificationCategory.Form'
import NotificationCategoryIndex from './Pages/NotificationCategory.Index'
import { notificationCategoryPath } from './infrastructure/notification-category.path'

const path = notificationCategoryPath

class NotificationCategoryModule {
  static menuItems: MenuItem[] = [
    {
      key: path.index,
      label: <Link to={path.index}>{Util.titleCase('category')}</Link>,
      icon: <FaTag />,
      permissions: [path.index],
    },
  ]

  static routes = [
    <Route
      key={path.index}
      path={path.index}
      element={<NotificationCategoryIndex />}
    />,
    <Route
      key={path.form}
      path={path.form}
      element={<NotificationCategoryForm />}
    />,
    <Route
      key={path.id()}
      path={path.id()}
      element={<NotificationCategoryForm />}
    />,
  ]
}

export default NotificationCategoryModule
