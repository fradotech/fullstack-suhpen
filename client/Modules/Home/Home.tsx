import { Button, Col, Layout, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CompanyLogo from '../../Components/Molecules/CompanyLogo/CompanyLogo'
import { themeColors } from '../../Layouts/ThemeProvider/theme'
import { useIsMobileScreen } from '../../common/utils/is-mobile'
import HomeHeaderSection from './common/HomeHeader.section'
import HomeProductSection from './common/HomeProduct.section'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobileScreen()

  return (
    <Layout>
      <HomeHeaderSection />
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
              {!isMobile && (
                <CompanyLogo style={{ width: '500px', padding: '12%' }} />
              )}
            </Col>
          </Row>
        </section>
        <section id="product">
          <HomeProductSection />
        </section>
      </Layout.Content>
    </Layout>
  )
}
export default Home
