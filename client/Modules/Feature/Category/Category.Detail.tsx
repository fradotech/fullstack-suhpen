import { ProjectOutlined } from '@ant-design/icons'
import { Avatar, Descriptions, Row, Tag } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import { Route } from '../../../Enums/Route'
import { categoryAction } from './category.action'

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await categoryAction.findOne(id)
  const { isLoading, data } = useQuery([ProductDetail.name], fetch)
  const color = ['blue', 'green', 'yellow', 'red', 'purple', 'orange']

  return (
    <>
      <PageHeader
        title="Product Detail"
        isLoading={isLoading}
        hrefEdit={Route.category.edit(id)}
        hrefDelete={Route.category.id(id)}
      />
      <Row>
        <Avatar
          size={250}
          icon={<ProjectOutlined />}
          style={{ margin: '32px' }}
          src={data?.data.thumbnail}
        />
        <DescriptionContainer>
          <Descriptions.Item label="Key">{data?.data?.key}</Descriptions.Item>
          <Descriptions.Item label="Name">
            <Tag color={color[Math.floor(Math.random() * color.length)]}>
              {data?.data?.name}
            </Tag>
          </Descriptions.Item>
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default ProductDetail
