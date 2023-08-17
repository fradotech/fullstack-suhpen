import { DashboardOutlined } from '@ant-design/icons'
import { Link, Route } from 'react-router-dom'
import { MenuItem } from '../../Layouts/LayoutMain/LayoutItems'
import Dashboard from './Pages/Dashboard'
import { dashboardPath } from './infrastructure/dashboard.path'

const path = dashboardPath

class DashboardModule {
  static menuItems: MenuItem[] = [
    {
      key: path.index,
      label: <Link to={path.index}>DASHBOARD</Link>,
      icon: <DashboardOutlined />,
      permissions: [path.index],
    },
  ]

  static routes = [
    <Route key={path.index} path={path.index} element={<Dashboard />} />,
  ]
}

export default DashboardModule
