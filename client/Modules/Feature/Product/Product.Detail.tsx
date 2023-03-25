import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Descriptions, Divider, Image } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import { Route } from '../../../Enums/Route'
import { Util } from '../../../utils/util'
import InventoryS from './Inventory/Inventory.S'
import { productAction } from './product.action'

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await productAction.findOne(id)
  const { isLoading, data } = useQuery([ProductDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Product Detail"
        isLoading={isLoading}
        hrefEdit={Route.product.edit(id)}
        hrefDelete={Route.product.id(id)}
      />
      <DescriptionContainer>
        {fields?.map((key) => {
          if (
            key == 'avatar' ||
            key == 'image' ||
            key == 'thumbnail' ||
            key == 'attachment'
          ) {
            return (
              <Descriptions.Item label={Util.titleCase(key)}>
                <Image style={{ width: '50px' }} src={data?.data[key]} />
              </Descriptions.Item>
            )
          } else if (data?.data[key] == true || data?.data[key] == false) {
            return (
              <Descriptions.Item label={Util.titleCase(key)}>
                {data?.data[key] ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )}
              </Descriptions.Item>
            )
          } else if (key.includes('At')) {
            return (
              <Descriptions.Item label={Util.titleCase(key)}>
                {Util.formatDatetime(data?.data[key])}
              </Descriptions.Item>
            )
          } else {
            return (
              <Descriptions.Item label={Util.titleCase(key)}>
                {data?.data[key] || '-'}
              </Descriptions.Item>
            )
          }
        })}
      </DescriptionContainer>
      <Divider />
      <InventoryS productId={id} />
      <Divider />
    </>
  )
}

export default ProductDetail
