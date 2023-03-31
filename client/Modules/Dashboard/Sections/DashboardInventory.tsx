import { Col, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import CardData from '../../../Components/Molecules/CardData/CardData'
import { dashboardInventoryAction } from './dashboardInventory.action'
import DemoLine from './DemoLine'
import DemoPie from './DemoPie'

const DashboardInventory: React.FC = () => {
  const buyPrice = async () => await dashboardInventoryAction.buyPrice()
  const sellPrice = async () => await dashboardInventoryAction.sellPrice()
  const marginPrice = async () => await dashboardInventoryAction.marginPrice()

  const fetch = async () => {
    return {
      buyPrice: await buyPrice(),
      sellPrice: await sellPrice(),
      marginPrice: await marginPrice(),
    }
  }

  const { data } = useQuery([DashboardInventory.name], fetch)

  return (
    <>
      <Col>
        <Row gutter={12}>
          <Col sm={24} md={12}>
            <CardData title="Product At Warehouse" value={946} />
          </Col>
          <Col sm={24} md={12}>
            <CardData title="Product At Sales" value={315} />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col sm={24} md={16}>
            <CardData title="Penjualan">
              <DemoLine />
            </CardData>
          </Col>
          <Col sm={24} md={8}>
            <CardData title="Categories">
              <DemoPie />
            </CardData>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col sm={24} md={6}>
            <CardData title="Buy Price Total" price={data?.buyPrice.sum} />
          </Col>
          <Col sm={24} md={6}>
            <CardData title="Sell Price Total" price={data?.sellPrice.sum} />
          </Col>
          <Col sm={24} md={6}>
            <CardData title="Buy Price Average" price={data?.buyPrice.avg} />
          </Col>
          <Col sm={24} md={6}>
            <CardData title="Sell Price Average" price={data?.sellPrice.avg} />
          </Col>
        </Row>
        <Row gutter={12}>
          <Col sm={24} md={12}>
            <CardData title="Margin Total" price={data?.marginPrice.sum} />
          </Col>
          <Col sm={24} md={12}>
            <CardData title="Margin Average" price={data?.marginPrice.avg} />
          </Col>
        </Row>
      </Col>
    </>
  )
}

export default DashboardInventory
