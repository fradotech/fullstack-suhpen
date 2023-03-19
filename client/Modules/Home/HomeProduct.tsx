import { Card, Col, Image, Layout, Row, Tag } from 'antd'
import Meta from 'antd/es/card/Meta'
import Title from 'antd/es/typography/Title'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Utils } from '../../utils/utils'
import styles from './Home.module.css'

const url = 'https://dummyjson.com/products'

interface IProduct {
  id: string
  title: string
  description: string
  price: string
  discountPercentage: string
  rating: string
  stock: string
  brand: string
  category: string
  thumbnail: string
}

const HomeProduct: React.FC = () => {
  const fetch = async () => {
    const res = await axios.get(url)
    return res.data.products as IProduct[]
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
                {data.title}
                <Meta
                  style={{ margin: '4px 0px' }}
                  title={
                    <Row>
                      <Title
                        style={{ color: '#FF5F1F', margin: '0' }}
                        level={5}
                      >
                        {Utils.formatCurrency(data.price + '0000')}
                      </Title>
                    </Row>
                  }
                ></Meta>
                <Row style={{ justifyContent: 'space-between' }}>
                  {+data.id % 2 == 0 ? (
                    <Tag color="red">30 %</Tag>
                  ) : (
                    <Tag color="green">Cashback</Tag>
                  )}
                  10rb+ Terjual
                </Row>
              </Card>
            )
          })}
        </Row>
      </Col>
    </Layout>
  )
}
export default HomeProduct
