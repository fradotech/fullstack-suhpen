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
          <Card
            style={{
              backgroundColor: '#007fd0',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Total'}
          >
            <Title level={4}>{Util.formatCurrency(data?.buyPrice.sum)}</Title>
          </Card>
          <Card
            style={{
              backgroundColor: '#007fd0',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Average'}
          >
            <Title level={4}>{Util.formatCurrency(data?.buyPrice.avg)}</Title>
          </Card>
          <Card
            style={{
              backgroundColor: '#007fd0',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Min'}
          >
            <Title level={4}>{Util.formatCurrency(data?.buyPrice.min)}</Title>
          </Card>
          <Card
            style={{
              backgroundColor: '#007fd0',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Max'}
          >
            <Title level={4}>{Util.formatCurrency(data?.buyPrice.max)}</Title>
          </Card>
        </Row>
      </Col>

      <Col>
        <Title level={4}>{'Sell Price'}</Title>
        <Row>
          <Card
            style={{
              backgroundColor: '#FFEF00',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Total'}
          >
            <Title level={4}>{Util.formatCurrency(data?.sellPrice.sum)}</Title>
          </Card>
          <Card
            style={{
              backgroundColor: '#FFEF00',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Average'}
          >
            <Title level={4}>{Util.formatCurrency(data?.sellPrice.avg)}</Title>
          </Card>
          <Card
            style={{
              backgroundColor: '#FFEF00',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Min'}
          >
            <Title level={4}>{Util.formatCurrency(data?.sellPrice.min)}</Title>
          </Card>
          <Card
            style={{
              backgroundColor: '#FFEF00',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Max'}
          >
            <Title level={4}>{Util.formatCurrency(data?.sellPrice.max)}</Title>
          </Card>
        </Row>
      </Col>

      <Col>
        <Title level={4}>{'Margin Price'}</Title>
        <Row>
          <Card
            style={{
              backgroundColor: '#FFEF00',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Total'}
          >
            <Title level={4}>
              {Util.formatCurrency(data?.marginPrice.sum)}
            </Title>
          </Card>
          <Card
            style={{
              backgroundColor: '#FFEF00',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Average'}
          >
            <Title level={4}>
              {Util.formatCurrency(data?.marginPrice.avg)}
            </Title>
          </Card>
          <Card
            style={{
              backgroundColor: '#FFEF00',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Min'}
          >
            <Title level={4}>
              {Util.formatCurrency(data?.marginPrice.min)}
            </Title>
          </Card>
          <Card
            style={{
              backgroundColor: '#FFEF00',
              margin: '10px',
              boxShadow: '2px 2px 5px ',
            }}
            bodyStyle={{ padding: '0px 10px' }}
            headStyle={{ padding: '0px 10px' }}
            title={'Max'}
          >
            <Title level={4}>
              {Util.formatCurrency(data?.marginPrice.max)}
            </Title>
          </Card>
        </Row>
      </Col>
    </>
  )
}

export default DashboardProduct
