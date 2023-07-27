import { FaPager } from 'react-icons/fa'
import { Link, Route } from 'react-router-dom'
import { MenuItem } from '../../../Layouts/LayoutMain/LayoutItems'
import { Util } from '../../../common/utils/util'
import NotificationTemplateForm from './Pages/NotificationTemplate.Form'
import NotificationTemplateIndex from './Pages/NotificationTemplate.Index'
import { notificationTemplatePath } from './infrastructure/notification-template.path'

const path = notificationTemplatePath

class NotificationTemplateModule {
  static menuItems: MenuItem[] = [
    {
      key: path.index,
      label: <Link to={path.index}>{Util.titleCase('Template')}</Link>,
      icon: <FaPager />,
      permissions: [path.index],
    },
  ]

  static routes = [
    <Route
      key={path.index}
      path={path.index}
      element={<NotificationTemplateIndex />}
    />,
    <Route
      key={path.form}
      path={path.form}
      element={<NotificationTemplateForm />}
    />,
    <Route
      key={path.id()}
      path={path.id()}
      element={<NotificationTemplateForm />}
    />,
  ]
}

export default NotificationTemplateModule
