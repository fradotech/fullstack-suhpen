import { UserOutlined } from '@ant-design/icons'
import { Avatar, Descriptions, Row, Tag } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import { Route } from '../../../Enums/Route'
import { Util } from '../../../utils/util'
import { ERole } from '../Role/Role.enum'
import { userAction } from './user.action'

const UserDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await userAction.findOne(id)
  const { isLoading, data } = useQuery([UserDetail.name], fetch)

  return (
    <>
      <PageHeader
        title="User Detail"
        isLoading={isLoading}
        hrefEdit={Route.user.edit(id)}
        hrefDelete={Route.user.id(id)}
      />
      <Row>
        <Avatar
          size={250}
          icon={<UserOutlined />}
          style={{ margin: '32px' }}
          src={data?.data.avatar}
        />
        <DescriptionContainer>
          <Descriptions.Item label="Name">{data?.data?.name}</Descriptions.Item>
          <Descriptions.Item label="Role">
            {data?.data.role == ERole.Administrator ? (
              <Tag color="blue">{data?.data.role}</Tag>
            ) : (
              <Tag color="green">{data?.data.role}</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {data?.data?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {data?.data?.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {data?.data?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {data?.data?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Birth Date">
            {data?.data?.birthDate && Util.formatDate(data?.data?.birthDate)}
          </Descriptions.Item>
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default UserDetail
