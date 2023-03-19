import { UserOutlined } from '@ant-design/icons'
import { Avatar, Descriptions, Row, Tag } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import { Utils } from '../../../utils/utils'
import { ERole } from '../Role/Role.enum'
import { accountAction } from './account.action'

const AccountDetail: React.FC = () => {
  const fetch = async () => await accountAction.getUserLogged()
  const { isLoading, data } = useQuery([AccountDetail.name], fetch)

  return (
    <>
      <PageHeader title="Account" isLoading={isLoading} />
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
          <Descriptions.Item label="Birth Date">
            {data?.data?.birthDate && Utils.dateFormat(data?.data?.birthDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {data?.data?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {data?.data?.address}
          </Descriptions.Item>
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default AccountDetail
