import { Button, Col, Layout, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CompanyLogo from '../../Components/Molecules/CompanyLogo/CompanyLogo'
import { themeColors } from '../../utils/theme'
import HomeHeader from './HomeHeader'
import HomeProduct from './HomeProduct'

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <HomeHeader />
      <Layout.Content>
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
                Get Started
              </Button>
            </Col>
            <Col>
              <CompanyLogo style={{ width: '500px', padding: '12%' }} />
            </Col>
          </Row>
        </section>
        <section id="product">
          <HomeProduct />
        </section>
      </Layout.Content>
    </Layout>
  )
}
export default Home
