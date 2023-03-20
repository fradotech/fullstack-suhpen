import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Col, Descriptions, Image } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import { Route } from '../../../Enums/Route'
import { Util } from '../../../utils/util'
import { userAction } from './user.action'

const UserDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await userAction.findOne(id)
  const { isLoading, data } = useQuery([UserDetail.name], fetch)
  const keys = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="User Detail"
        isLoading={isLoading}
        hrefEdit={Route.user.edit(id)}
        hrefDelete={Route.user.id(id)}
      />
      <Col>
        <DescriptionContainer>
          {keys?.map((key) => {
            if (
              key == 'avatar' ||
              key == 'image' ||
              key == 'thumbnail' ||
              key == 'attachment'
            ) {
              return (
                <Descriptions.Item label={Util.titleCase(key)}>
                  <Image style={{ width: '50px' }} src={data?.data.avatar} />
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
            } else {
              return (
                <Descriptions.Item label={Util.titleCase(key)}>
                  {data?.data[key] || '-'}
                </Descriptions.Item>
              )
            }
          })}
        </DescriptionContainer>
      </Col>
    </>
  )
}

export default UserDetail
