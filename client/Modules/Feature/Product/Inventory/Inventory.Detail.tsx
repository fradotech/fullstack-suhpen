import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Descriptions, Image } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import { Route } from '../../../../Enums/Route'
import { Util } from '../../../../utils/util'
import { inventoryAction } from './inventory.action'

const InventoryDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await inventoryAction.findOne(id)
  const { isLoading, data } = useQuery([InventoryDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Inventory Detail"
        isLoading={isLoading}
        hrefEdit={Route.inventory.edit(id)}
        hrefDelete={Route.inventory.id(id)}
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
          } else if (key.includes('At') || key.includes('Date')) {
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
    </>
  )
}

export default InventoryDetail
