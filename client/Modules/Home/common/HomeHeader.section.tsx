import { Layout } from 'antd'
import React from 'react'
import CompanyLogo from '../../../Components/Molecules/CompanyLogo/CompanyLogo'
import { themeColors } from '../../../Layouts/ThemeProvider/theme'
import { Path } from '../../../common/Path'
import { AuthAction } from '../../Iam/Auth/infrastructure/auth.action'
import styles from '../Home.module.css'

const user = AuthAction.loggedUser()

const HomeHeaderSection: React.FC = () => {
  return (
    <Layout.Header
      style={{ backgroundColor: themeColors.primary, padding: '0% 10%' }}
    >
      <div style={{ float: 'left' }}>
        <a href={Path.Home}>
          <CompanyLogo
            style={{
              padding: '4px',
              width: '46px',
              backgroundColor: 'white',
              borderRadius: '28px',
            }}
          />
        </a>
      </div>
      <div style={{ float: 'right' }}>
        <a className={styles.headerItem} href={'#home'}>
          Home
        </a>
        <a className={styles.headerItem} href={'#product'}>
          Product
        </a>
        {user ? (
          <a
            className={styles.headerItem}
            onClick={() => location.replace(Path.dashboard.index)}
          >
            Dashboard
          </a>
        ) : (
          <a
            className={styles.headerItem}
            onClick={() => location.replace(Path.login)}
          >
            Login
          </a>
        )}
      </div>
    </Layout.Header>
  )
}
export default HomeHeaderSection
