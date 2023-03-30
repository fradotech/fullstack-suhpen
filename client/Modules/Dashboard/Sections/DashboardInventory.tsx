import { Col, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import CardData from '../../../Components/Molecules/CardData/CardData'
import { dashboardInventoryAction } from './dashboardInventory.action'
import DemoLine from './DemoLine'

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
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CardData
            oneLineWidth="23%"
            title="Buy Price Total"
            value={data?.buyPrice.sum}
          />
          <CardData
            oneLineWidth="23%"
            title="Sell Price Total"
            value={data?.sellPrice.sum}
          />
          <CardData
            oneLineWidth="23%"
            title="Buy Price Average"
            value={data?.buyPrice.avg}
          />
          <CardData
            oneLineWidth="23%"
            title="Sell Price Average"
            value={data?.sellPrice.avg}
          />
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CardData oneLineWidth="48%" title="Pembelian">
            <DemoLine />
          </CardData>
          <CardData oneLineWidth="48%" title="Penjualan">
            <DemoLine />
          </CardData>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CardData
            oneLineWidth="48%"
            title="Margin Total"
            value={data?.marginPrice.sum}
          />
          <CardData
            oneLineWidth="48%"
            title="Margin Average"
            value={data?.marginPrice.avg}
          />
        </Row>
      </Col>
    </>
  )
}

export default DashboardInventory
