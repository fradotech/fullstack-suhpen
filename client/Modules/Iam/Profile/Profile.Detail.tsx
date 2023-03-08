import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Avatar, Button, Descriptions, Row, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DescriptionContainer from '../../../Components/Molecules/DescriptionContainer/DescriptionContainer'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { Route } from '../../../Enums/Route'
import { Utils } from '../../../utils/utils'
import { ERole } from '../Role/Role.enum'
import { profileAction } from './profile.action'

const ProfileDetail: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [props, setProps] = React.useState<IApiRes<UserResponse>>()
  const fetch = async () => {
    setIsLoading(true)
    setProps(await profileAction.getUserLogged())
    setIsLoading(false)
  }

  React.useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <PageHeader title="Profile" isLoading={isLoading} />
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
          <Descriptions.Item label="Birth Date">
            {props?.data?.birthDate && Utils.dateFormat(props?.data?.birthDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {props?.data?.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {props?.data?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Action">
            <Button type="primary" onClick={() => navigate(Route.ProfileEdit)}>
              <EditOutlined />
            </Button>
          </Descriptions.Item>
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default ProfileDetail
