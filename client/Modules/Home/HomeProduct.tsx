import { IProduct } from '@server/modules/feature/product/infrastructure/product.interface'
import { Card, Col, Image, Layout, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useQuery } from 'react-query'
import { axiosService } from '../../services/axios.service'
import styles from './Home.module.css'

const path = '/products'

const HomeProduct: React.FC = () => {
  const fetch = async () => {
    const query = { pageSize: 100 }
    const res = await axiosService.get(path, query)
    return res.data as IProduct[]
  }
  const { isLoading, data } = useQuery([HomeProduct.name], fetch)

  return (
    <Layout style={{ backgroundColor: '#FAFAFA' }}>
      <Title style={{ textAlign: 'center' }}>Products</Title>
      <Col className={styles.productContainer}>
        <Row className={styles.productRow}>
          {data?.map((data) => {
            return (
              <Card
                loading={isLoading}
                hoverable
                className={styles.card}
                bodyStyle={{ padding: '12px 6px' }}
                cover={
                  <Image
                    preview={false}
                    className={styles.cardImage}
                    src={data.thumbnail}
                  />
                }
              >
                {data.name}
                <Title style={{ color: '#FF5F1F', margin: '2px' }} level={5}>
                  {'Util.formatCurrency(data.sellPrice)'}
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
export default HomeProduct
