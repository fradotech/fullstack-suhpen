import { FaKey } from 'react-icons/fa'
import { Link, Route } from 'react-router-dom'
import { MenuItem } from '../../../Layouts/LayoutMain/LayoutItems'
import { Util } from '../../../common/utils/util'
import PermissionForm from './Pages/Permission.Form'
import PermissionIndex from './Pages/Permission.Index'
import { permissionPath } from './infrastructure/permission.path'

const path = permissionPath

export class PermissionModule {
  static menuItems: MenuItem[] = [
    {
      key: path.index,
      label: <Link to={path.index}>{Util.titleCase('permission')}</Link>,
      icon: <FaKey />,
      permissions: [path.index],
    },
  ]

  static routes = [
    <Route key={path.index} path={path.index} element={<PermissionIndex />} />,
    <Route key={path.form} path={path.form} element={<PermissionForm />} />,
    <Route key={path.id()} path={path.id()} element={<PermissionForm />} />,
  ]
}

export default PermissionModule
