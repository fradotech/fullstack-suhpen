import { UserOutlined } from '@ant-design/icons'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Avatar, Descriptions, Row, Tag } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import DescriptionContainer from '../../../Components/Molecules/DescriptionContainer/DescriptionContainer'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { Utils } from '../../../utils/utils'
import { ERole } from '../Role/Role.enum'
import { userAction } from './user.action'

const UserDetail: React.FC = () => {
  const { id } = useParams()
  const [props, setProps] = React.useState<IApiRes<UserResponse>>()
  const fetch = async () => setProps(await userAction.findOne(id))

  React.useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <PageHeader title="Profile" />
      <Row>
        <Avatar
          size={250}
          icon={<UserOutlined />}
          style={{ margin: '32px' }}
          src={props?.data.avatar}
        />
        <DescriptionContainer>
          <Descriptions.Item label="Name">
            {props?.data?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {props?.data.role == ERole.Administrator ? (
              <Tag color="blue">{props?.data.role}</Tag>
            ) : (
              <Tag color="green">{props?.data.role}</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {props?.data?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {props?.data?.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {props?.data?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {props?.data?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Birth Date">
            {props?.data?.birthDate && Utils.dateFormat(props?.data?.birthDate)}
          </Descriptions.Item>
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default UserDetail
