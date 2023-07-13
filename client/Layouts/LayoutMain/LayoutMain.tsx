import { Col, Layout } from 'antd'
import React, { useContext } from 'react'
import CompanyLogo from '../../Components/Molecules/CompanyLogo/CompanyLogo'
import useAuthGuard from '../../Modules/Iam/Auth/common/useAuthGuard'
import { ThemeContext } from '../ThemeProvider/ThemeProvider'
import { themeColors, themeColorsDark } from '../ThemeProvider/theme'
import LayoutHeader from './LayoutHeader'
import styles from './LayoutMain.module.css'
import LayoutSidebar from './LayoutSidebar'

type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

const LayoutMain: React.FC<IProps> = ({ children }: IProps) => {
  const { user } = useAuthGuard()
  const [isCollapsed, setIsCollapsed] = React.useState(
    localStorage.getItem('isSidebarCollapsed') === 'false' ? true : false,
  )

  const handleSidebarCollapse = () => {
    setIsCollapsed(!isCollapsed)
    localStorage.setItem('isSidebarCollapsed', isCollapsed ? 'true' : 'false')
  }

  const { isDarkMode, handleSwitchTheme } = useContext(ThemeContext)

  const bgLayoutColor = React.useMemo(() => {
    return isDarkMode ? themeColorsDark?.solid : themeColors.solid
  }, [isDarkMode])

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        className={styles.sider}
        style={{ background: bgLayoutColor }}
      >
        <Col style={{ padding: '8px', textAlign: 'center' }}>
          <CompanyLogo />
        </Col>
        <Col
          className={styles.sidebarContainer}
          style={{ background: bgLayoutColor }}
        >
          <LayoutSidebar isDarkMode={isDarkMode ?? false} />
        </Col>
      </Layout.Sider>
      <Layout>
        <Layout.Content className={styles.contentContainer}>
          <LayoutHeader
            bgLayoutColor={bgLayoutColor}
            handleSidebarCollapse={handleSidebarCollapse}
            isCollapsed={isCollapsed}
            isDarkMode={isDarkMode}
            handleSwitchTheme={handleSwitchTheme}
            user={user}
          />
          <Col
            className={styles.content}
            style={{
              background: isDarkMode
                ? themeColorsDark.background
                : themeColors.background,
            }}
          >
            {children}
          </Col>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default LayoutMain
