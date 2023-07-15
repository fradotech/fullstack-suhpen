import { Col, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import CardData from '../../../Components/Molecules/CardData/CardData'
import DemoLine from './DemoLine'
import DemoPie from './DemoPie'
import { DashboardUserAction } from './dashboardUser.action'

const DashboardVariant: React.FC = () => {
  const otp = async () => await DashboardUserAction.otp()

  const fetch = async () => {
    return {
      otp: await otp(),
    }
  }

  const { data } = useQuery([DashboardVariant.name], fetch)

  return (
    <>
      <Col>
        <Row gutter={12}>
          <Col sm={24} md={6}>
            <CardData title="User OTP Total" value={data?.otp?.sum || 8723} />
          </Col>
          <Col sm={24} md={6}>
            <CardData title="User Total" price={7000} />
          </Col>
          <Col sm={24} md={6}>
            <CardData title="User OTP Average" value={data?.otp?.avg || 3779} />
          </Col>
          <Col sm={24} md={6}>
            <CardData title="User Average" price={3463} />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col sm={24} md={14}>
            <CardData title="Penjualan">
              <DemoLine />
            </CardData>
          </Col>
          <Col sm={24} md={10}>
            <CardData title="Categories">
              <DemoPie />
            </CardData>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default DashboardVariant
