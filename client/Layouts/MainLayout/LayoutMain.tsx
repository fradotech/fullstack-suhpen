import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Layout } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../../Components/Molecules/Section/Section'
import { Route } from '../../Enums/Route'
import useUser from '../../Hooks/useUser'
import { authAction } from '../../Modules/Iam/Auth/auth.action'
import { sidebarThemeConfig } from '../../utils/theme'
import LayoutCompanyLogo from './LayoutCompanyLogo'
import LayoutProfile from './LayoutProfile'
import LayoutSidebar from './LayoutSidebar'

type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

const LayoutMain: React.FC<IProps> = ({ children }: IProps) => {
  const { user } = useUser()
  const [isCollapsed, setIsCollapsed] = React.useState(
    localStorage.getItem('isSidebarCollapsed') == 'false' ? true : false,
  )

  const handleLogout = (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.KeyboardEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault()
    const isConfirm = confirm('Are you sure to logout? ')
    isConfirm && authAction.logout() && location.replace(Route.Login)
  }

  const handleSidebarCollapse = () => {
    setIsCollapsed(!isCollapsed)
    localStorage.setItem('isSidebarCollapsed', isCollapsed ? 'true' : 'false')
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        style={{
          backgroundColor: sidebarThemeConfig.components.Menu.colorItemBg,
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <LayoutCompanyLogo />
          <LayoutSidebar />
        </div>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: '#ffffff' }}>
          <a onClick={handleSidebarCollapse}>
            {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </a>
          <LayoutProfile user={user} />
          <Link to="#" onClick={handleLogout}>
            <LogoutOutlined style={{ color: 'red', marginLeft: '1%' }} />
          </Link>
        </Layout.Header>
        <Layout.Content
          style={{
            padding: '20px 20px',
            overflow: 'auto',
          }}
        >
          <Section>{children}</Section>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default LayoutMain
