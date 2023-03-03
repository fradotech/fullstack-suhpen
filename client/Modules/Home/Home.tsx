import { Button, Col, Layout, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CompanyLogo from '../../Components/Molecules/CompanyLogo/CompanyLogo'
import { Route } from '../../Enums/Route'
import { themeColors } from '../../utils/theme'
import { authAction } from '../Iam/Auth/auth.action'
import styles from './Home.module.css'

const user = authAction.loggedUser()

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Layout.Header style={{ backgroundColor: themeColors.primary }}>
        <div style={{ float: 'right' }}>
          <Link className={styles.headerItem} to={'#home'}>
            Home
          </Link>
          {user ? (
            <Link className={styles.headerItem} to={Route.Dashboard}>
              Dashboard
            </Link>
          ) : (
            <Link className={styles.headerItem} to={Route.Login}>
              Login
            </Link>
          )}
        </div>
      </Layout.Header>
      <Layout.Content className={styles.layoutContent}>
        <section id="home">
          <Row style={{ justifyContent: 'space-between' }}>
            <Col style={{ padding: '10%' }}>
              <Title style={{ color: themeColors.primary }}>Fradotech</Title>
              <Title level={4} style={{ opacity: '80%' }}>
                Uvuefe nyevfe onyete nyevwe ugwem ugwem osas, hura
              </Title>
              <Button
                type="primary"
                style={{ marginTop: '6px' }}
                onClick={() => navigate('#')}
              >
                Get Started!
              </Button>
            </Col>
            <Col>
              <CompanyLogo style={{ width: '500px', padding: '12%' }} />
            </Col>
          </Row>
        </section>
      </Layout.Content>
    </Layout>
  )
}
export default Home
