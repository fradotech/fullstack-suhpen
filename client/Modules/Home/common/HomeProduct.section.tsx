import { Card, Col, Image, Layout, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Util } from '../../../common/utils/util'
import { InventoryAction } from '../../Feature/Inventory/infrastructure/inventory.action'
import styles from '../Home.module.css'

const HomeProductSection: React.FC = () => {
  const { isLoading, data } = InventoryAction.useIndex({ pageSize: 100 })

  return (
    <Layout>
      <Title style={{ textAlign: 'center' }}>Products</Title>
      <Col className={styles.productContainer}>
        <Row className={styles.productRow}>
          {data?.data.map((data) => {
            return (
              <Card
                key={data.id}
                bordered={false}
                loading={isLoading}
                hoverable
                className={styles.card}
                bodyStyle={{ padding: '12px 6px' }}
                cover={
                  <Image
                    preview={false}
                    className={styles.cardImage}
                    src={data.product?.thumbnail}
                  />
                }
              >
                {data.product?.name}
                <Title style={{ color: '#FF5F1F', margin: '2px' }} level={5}>
                  {Util.formatCurrency(data.sellPrice)}
                </Title>
                <p style={{ opacity: '70%', margin: '0px' }}>10rb+ Terjual</p>
              </Card>
            )
          })}
        </Row>
      </Col>
    </Layout>
  )
}
export default HomeProductSection
