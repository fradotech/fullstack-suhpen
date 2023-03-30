import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Col, Layout } from 'antd'
import React from 'react'
import CompanyLogo from '../../Components/Molecules/CompanyLogo/CompanyLogo'
import useUser from '../../Modules/Iam/User/common/useUser'
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
          height: '82vh',
        }}
      >
        <Col style={{ padding: '8px', textAlign: 'center' }}>
          <CompanyLogo />
        </Col>
        <Col className={styles.sidebarContainer}>
          <LayoutSidebar />
        </Col>
      </Layout.Sider>
      <Layout>
        <Layout.Content className={styles.contentContainer}>
          <Layout.Header className={styles.header}>
            <Col className={styles.headerContainer}>
              <a onClick={handleSidebarCollapse}>
                {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </a>

              <Col className={styles.account}>
                <LayoutAccount user={user} />
              </Col>
            </Col>
          </Layout.Header>
          <Col className={styles.content}>{children}</Col>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default LayoutMain
