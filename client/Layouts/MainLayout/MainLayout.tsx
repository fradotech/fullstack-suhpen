import { Layout } from 'antd'
import React from 'react'
import { Section } from '../../Components/Molecules/Section/Section'
import useUser from '../../Hooks/useUser'
import { sidebarThemeConfig } from '../../utils/theme'
import ProfileBar from './ProfileBar'
import Sidebar from './Sidebar'

type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

const { Sider, Content } = Layout

const MainLayout: React.FC<IProps> = ({ children }: IProps) => {
  const { user } = useUser()

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
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
          <ProfileBar user={user} />
          <Sidebar />
        </div>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: '28px 24px',
            overflow: 'auto',
          }}
        >
          <Section>{children}</Section>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
