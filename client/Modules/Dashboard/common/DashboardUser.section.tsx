import { UserOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import CardStatistic from '../../../Components/Molecules/CardStatistic/CardStatistic'
import { DashboardUserAction } from '../infrastructure/dashboardUser.action'
import DemoLine from './DemoLine'
import DemoPie from './DemoPie'

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
            <CardStatistic
              title="User OTP Total"
              value={data?.otp?.sum || 8723}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col sm={24} md={6}>
            <CardStatistic title="User Total" value={7000} />
          </Col>
          <Col sm={24} md={6}>
            <CardStatistic
              title="User OTP Average"
              value={data?.otp?.avg || 3779}
            />
          </Col>
          <Col sm={24} md={6}>
            <CardStatistic title="User Average" value={3463} />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col sm={24} md={14}>
            <Card title="Penjualan" bordered={false}>
              <DemoLine />
            </Card>
          </Col>
          <Col sm={24} md={10}>
            <Card title="Categories" bordered={false}>
              <DemoPie />
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default DashboardVariant
