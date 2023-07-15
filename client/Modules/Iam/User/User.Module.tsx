import { FaUser } from 'react-icons/fa'
import { Link, Route } from 'react-router-dom'
import { MenuItem } from '../../../Layouts/LayoutMain/LayoutItems'
import { Util } from '../../../common/utils/util'
import UserForm from './Pages/User.Form'
import UserIndex from './Pages/User.Index'
import { userPath } from './infrastructure/user.path'

const path = userPath

export class UserModule {
  static menuItems: MenuItem[] = [
    {
      key: path.index,
      label: <Link to={path.index}>{Util.titleCase('user')}</Link>,
      icon: <FaUser />,
      permissions: [path.index],
    },
  ]

  static routes = [
    <Route key={path.index} path={path.index} element={<UserIndex />} />,
    <Route key={path.form} path={path.form} element={<UserForm />} />,
    <Route key={path.id()} path={path.id()} element={<UserForm />} />,
  ]
}

export default UserModule
