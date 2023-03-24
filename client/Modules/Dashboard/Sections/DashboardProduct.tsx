import { Card, Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useQuery } from 'react-query'
import { Util } from '../../../utils/util'
import { dashboardProductAction } from './dashboardProduct.action'

const DashboardProduct: React.FC = () => {
  const buyPrice = async () => await dashboardProductAction.buyPrice()
  const sellPrice = async () => await dashboardProductAction.sellPrice()
  const marginPrice = async () => await dashboardProductAction.marginPrice()

  const fetch = async () => {
    return {
      buyPrice: await buyPrice(),
      sellPrice: await sellPrice(),
      marginPrice: await marginPrice(),
    }
  }

  const { data } = useQuery([DashboardProduct.name], fetch)

  return (
    <>
      <Col>
        <Title level={4}>{'Buy Price'}</Title>
        <Row>
          <Card size="small" style={{ marginRight: '20px' }}>
            Total
            <Title level={5}>{Util.formatCurrency(data?.buyPrice.sum)}</Title>
          </Card>
          <Card size="small" style={{ marginRight: '20px' }}>
            Average
            <Title level={5}>{Util.formatCurrency(data?.buyPrice.avg)}</Title>
          </Card>
          <Card size="small" style={{ marginRight: '20px' }}>
            Min
            <Title level={5}>{Util.formatCurrency(data?.buyPrice.min)}</Title>
          </Card>
          <Card size="small" style={{ marginRight: '20px' }}>
            Max
            <Title level={5}>{Util.formatCurrency(data?.buyPrice.max)}</Title>
          </Card>
        </Row>
      </Col>
      <Col>
        <Title level={4}>{'Sell Price'}</Title>
        <Row>
          <Card size="small" style={{ marginRight: '20px' }}>
            Total
            <Title level={5}>{Util.formatCurrency(data?.sellPrice.sum)}</Title>
          </Card>
          <Card size="small" style={{ marginRight: '20px' }}>
            Average
            <Title level={5}>{Util.formatCurrency(data?.sellPrice.avg)}</Title>
          </Card>
          <Card size="small" style={{ marginRight: '20px' }}>
            Min
            <Title level={5}>{Util.formatCurrency(data?.sellPrice.min)}</Title>
          </Card>
          <Card size="small" style={{ marginRight: '20px' }}>
            Max
            <Title level={5}>{Util.formatCurrency(data?.sellPrice.max)}</Title>
          </Card>
        </Row>
      </Col>
    </>
  )
}

export default DashboardProduct
