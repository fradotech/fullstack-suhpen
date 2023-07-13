import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Button, Layout, Row } from 'antd'
import React from 'react'
import { FaBell, FaMoon, FaSun } from 'react-icons/fa'
import LayoutAccount from './LayoutAccount'
import styles from './LayoutMain.module.css'

type IProps = {
  bgLayoutColor: string
  handleSidebarCollapse: () => void
  isCollapsed: boolean
  isDarkMode: boolean | undefined
  handleSwitchTheme: ((boolean: boolean) => void) | undefined
  user: IUser
}

const LayoutHeader: React.FC<IProps> = ({
  bgLayoutColor,
  handleSidebarCollapse,
  isCollapsed,
  isDarkMode,
  handleSwitchTheme,
  user,
}: IProps) => {
  return (
    <Layout.Header
      className={styles.header}
      style={{ background: bgLayoutColor }}
    >
      <Row className={styles.headerContainer}>
        <a onClick={handleSidebarCollapse}>
          {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </a>

        <Row>
          <Button
            type="ghost"
            shape="circle"
            size="large"
            icon={isDarkMode ? <FaSun /> : <FaMoon />}
            onClick={() => {
              handleSwitchTheme && handleSwitchTheme(isDarkMode ?? false)
            }}
            className={styles.themeButton}
          />

          <Button
            type="ghost"
            shape="circle"
            size="large"
            icon={<FaBell />}
            className={styles.themeButton}
          />

          <div style={{ margin: '6px' }}></div>

          <LayoutAccount user={user} isDarkMode={isDarkMode ?? false} />
        </Row>
      </Row>
    </Layout.Header>
  )
}

export default LayoutHeader
