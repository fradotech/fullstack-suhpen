import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Button, Layout, Row } from 'antd'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import LayoutAccount from './LayoutAccount'
import styles from './LayoutMain.module.css'
import LayoutNotification from './LayoutNotification'
import LayoutSearch from './LayoutSearch'

type IProps = {
  bgLayoutColor?: string
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
          <Row>
            <LayoutSearch />

            <div className={styles.headerButton}>
              <Button
                type="ghost"
                shape="circle"
                size="large"
                icon={isDarkMode ? <FaSun /> : <FaMoon />}
                onClick={() => {
                  handleSwitchTheme && handleSwitchTheme(isDarkMode ?? false)
                }}
              />
            </div>

            <div className={styles.headerButton}>
              <LayoutNotification />
            </div>
          </Row>
          <LayoutAccount user={user} />
        </Row>
      </Row>
    </Layout.Header>
  )
}

export default LayoutHeader
