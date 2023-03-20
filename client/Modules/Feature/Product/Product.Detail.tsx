import { ProjectOutlined } from '@ant-design/icons'
import { Avatar, Descriptions, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import { Route } from '../../../Enums/Route'
import { productAction } from './product.action'

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await productAction.findOne(id)
  const { isLoading, data } = useQuery([ProductDetail.name], fetch)

  return (
    <>
      <PageHeader
        title="Product Detail"
        isLoading={isLoading}
        hrefEdit={Route.product.edit(id)}
        hrefDelete={Route.product.id(id)}
      />
      <Row>
        <Avatar
          size={250}
          icon={<ProjectOutlined />}
          style={{ margin: '32px' }}
          src={data?.data.thumbnail}
        />
        <DescriptionContainer>
          <Descriptions.Item label="Name">{data?.data?.name}</Descriptions.Item>
          <Descriptions.Item label="Buy Price">
            {data?.data?.buyPrice}
          </Descriptions.Item>
          <Descriptions.Item label="Sell Price">
            {data?.data?.sellPrice}
          </Descriptions.Item>
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default ProductDetail
