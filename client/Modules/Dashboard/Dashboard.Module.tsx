import { DashboardOutlined } from '@ant-design/icons'
import { Link, Route } from 'react-router-dom'
import { Modules } from '../../../@server/modules/modules'
import { MenuItem } from '../../Layouts/LayoutMain/LayoutItems'
import Dashboard from './Pages/Dashboard'

const root = `/${Modules.Dashboard}`
const rootUser = `/${Modules.DashboardUser}`

export class DashboardModule {
  static path = {
    index: root,
    user: {
      aggregate: (field?: string) => `${rootUser}/aggregate/${field || ''}`,
    },
  }

  static menuItems: MenuItem[] = [
    {
      key: this.path.index,
      label: <Link to={this.path.index}>DASHBOARD</Link>,
      icon: <DashboardOutlined />,
      permissions: [this.path.index],
    },
  ]

  static routes = [
    <Route
      key={this.path.index}
      path={this.path.index}
      element={<Dashboard />}
    />,
  ]
}

export default DashboardModule
