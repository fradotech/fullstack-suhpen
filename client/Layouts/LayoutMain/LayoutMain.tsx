import { Col, Layout } from 'antd'
import React, { useContext } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import useAuthGuard from '../../Modules/Iam/Auth/Components/useAuthGuard'
import { ThemeContext } from '../ThemeProvider/ThemeProvider'
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

  const { isDarkMode, handleSwitchTheme, themeColors } =
    useContext(ThemeContext)

  return (
    <>
      <LayoutHeader
        bgLayoutColor={themeColors?.solid}
        isDarkMode={isDarkMode}
        handleSwitchTheme={handleSwitchTheme}
        user={user}
      />
      <Layout style={{ height: '100vh' }}>
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={isCollapsed}
          className={styles.sider}
          style={{ background: themeColors?.solid }}
        >
          <Col
            className={styles.sidebarContainer}
            style={{ background: themeColors?.solid }}
          >
            <LayoutSidebar isDarkMode={isDarkMode ?? false} />
            {/* <Divider /> */}
            <a
              onClick={handleSidebarCollapse}
              className={styles.sidebarCollapse}
            >
              {isCollapsed ? (
                <FaChevronRight className={styles.menuFold} />
              ) : (
                <FaChevronLeft className={styles.menuFold} />
              )}
            </a>
          </Col>
        </Layout.Sider>
        <Layout>
          <Layout.Content className={styles.contentContainer}>
            <Col
              className={styles.content}
              style={{
                background: themeColors?.background,
              }}
            >
              {children}
            </Col>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutMain
