import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Button, Layout, Row } from 'antd'
import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import CompanyLogo from '../../../client/Components/Molecules/CompanyLogo/CompanyLogo'
import LayoutAccount from './LayoutAccount'
import styles from './LayoutMain.module.css'
import LayoutSearch from './LayoutSearch'

type IProps = {
  bgLayoutColor?: string
  isDarkMode: boolean | undefined
  handleSwitchTheme: ((boolean: boolean) => void) | undefined
  user: IUser
}

const LayoutHeader: React.FC<IProps> = ({
  bgLayoutColor,
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
        <Row>
          <CompanyLogo style={{ width: 42, marginLeft: 30 }} />
        </Row>
        <Row>
          <Row>
            <LayoutSearch />

            <div className={styles.headerButton}>
              <Button
                type="text"
                shape="circle"
                size="large"
                icon={isDarkMode ? <FaSun /> : <FaMoon />}
                onClick={() => {
                  handleSwitchTheme && handleSwitchTheme(isDarkMode ?? false)
                }}
              />
            </div>

            {/* // TODO: Uncomment this when notification is ready */}
            {/* <div className={styles.headerButton}>
              <LayoutNotification />
            </div> */}
          </Row>
          <LayoutAccount user={user} />
        </Row>
      </Row>
    </Layout.Header>
  )
}

export default LayoutHeader
