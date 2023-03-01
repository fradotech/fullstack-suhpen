import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Layout, Popconfirm } from 'antd'
import Style from './LayoutMain.module.css'
import React from 'react'
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

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    authAction.logout() && location.replace(Route.Login)
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
          <div className={Style.profileView}>
            <a onClick={handleSidebarCollapse}>
              {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </a>

            <div className={Style.itemProfileView}>
              <LayoutProfile user={user} />
              <Popconfirm
                title="Are you sure want to logout?"
                onConfirm={handleLogout}
              >
                <LogoutOutlined style={{ color: 'red', marginLeft: '1%' }} />
              </Popconfirm>
            </div>
          </div>
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
