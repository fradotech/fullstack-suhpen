import { FaUserCog } from 'react-icons/fa'
import { Link, Route } from 'react-router-dom'
import { MenuItem } from '../../../Layouts/LayoutMain/LayoutItems'
import { Util } from '../../../common/utils/util'
import RoleForm from './Pages/Role.Form'
import RoleIndex from './Pages/Role.Index'
import { rolePath } from './infrastructure/role.path'

const path = rolePath

class RoleModule {
  static menuItems: MenuItem[] = [
    {
      key: path.index,
      label: <Link to={path.index}>{Util.titleCase('role')}</Link>,
      icon: <FaUserCog />,
      permissions: [path.index],
    },
  ]

  static routes = [
    <Route key={path.index} path={path.index} element={<RoleIndex />} />,
    <Route key={path.form} path={path.form} element={<RoleForm />} />,
    <Route key={path.id()} path={path.id()} element={<RoleForm />} />,
  ]
}

export default RoleModule
