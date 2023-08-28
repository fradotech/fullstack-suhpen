import { FaHistory } from 'react-icons/fa'
import { Link, Route } from 'react-router-dom'
import { MenuItem } from '../../../Layouts/LayoutMain/LayoutItems'
import { Util } from '../../../common/utils/util'
import LogActivityForm from './Pages/LogActivity.Form'
import LogActivityIndex from './Pages/LogActivity.Index'
import { logActivityPath } from './infrastructure/log-activity.path'

const path = logActivityPath

class LogActivityModule {
  static menuItems: MenuItem[] = [
    {
      key: path.index,
      label: <Link to={path.index}>{Util.titleCase('logActivity')}</Link>,
      icon: <FaHistory />,
      permissions: [path.index],
    },
  ]

  static routes = [
    <Route key={path.index} path={path.index} element={<LogActivityIndex />} />,
    <Route key={path.id()} path={path.id()} element={<LogActivityForm />} />,
  ]
}

export default LogActivityModule
