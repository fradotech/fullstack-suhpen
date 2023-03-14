import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Col, Layout } from 'antd'
import React from 'react'
import CompanyLogo from '../../Components/Molecules/CompanyLogo/CompanyLogo'
import { Section } from '../../Components/Molecules/Section/Section'
import useUser from '../../Hooks/useUser'
import { sidebarThemeConfig } from '../../utils/theme'
import LayoutAccount from './LayoutAccount'
import styles from './LayoutMain.module.css'
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
        <div className={styles.sidebarContainer}>
          <Col style={{ padding: '8px', textAlign: 'center' }}>
            <CompanyLogo />
          </Col>
          <LayoutSidebar />
        </div>
      </Layout.Sider>
      <Layout>
        <Layout.Header className={styles.header}>
          <div className={styles.headerContainer}>
            <a onClick={handleSidebarCollapse}>
              {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </a>

            <div className={styles.account}>
              <LayoutAccount user={user} />
            </div>
          </div>
        </Layout.Header>
        <Layout.Content className={styles.content}>
          <Section>{children}</Section>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default LayoutMain
