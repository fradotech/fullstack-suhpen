import { Layout } from 'antd'
import React from 'react'
import CompanyLogo from '../../Components/Molecules/CompanyLogo/CompanyLogo'
import { Route } from '../../Enums/Route'
import { themeColors } from '../../Layouts/ThemeProvider/theme'
import { authAction } from '../Iam/Auth/auth.action'
import styles from './Home.module.css'

const user = authAction.loggedUser()

const HomeHeader: React.FC = () => {
  return (
    <Layout.Header
      style={{ backgroundColor: themeColors.primary, padding: '0% 10%' }}
    >
      <div style={{ float: 'left' }}>
        <a href={Route.Home}>
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
            onClick={() => location.replace(Route.dashboard.index)}
          >
            Dashboard
          </a>
        ) : (
          <a
            className={styles.headerItem}
            onClick={() => location.replace(Route.login)}
          >
            Login
          </a>
        )}
      </div>
    </Layout.Header>
  )
}
export default HomeHeader
