import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Avatar, Popconfirm, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'
import { authAction } from '../../Modules/Iam/Auth/auth.action'

type IProps = {
  children?: React.ReactNode
  headerRightMenu?: React.FC
  user: IUser
}

const LayoutProfile: React.FC<IProps> = (props: IProps) => {
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    authAction.logout() && location.replace(Route.Login)
  }

  return (
    <>
      <Link to={Route.Profile} style={{ width: '6rem' }}>
        <Space size="small">
          <Avatar icon={<UserOutlined />} src={props?.user.avatar} />
          <Space.Compact direction="vertical" size="small">
            <Typography.Text>{props?.user?.name}</Typography.Text>
          </Space.Compact>
        </Space>
      </Link>
      <Popconfirm title="Are you sure want to logout?" onConfirm={handleLogout}>
        <LogoutOutlined style={{ color: 'red', marginBottom: '5px' }} />
      </Popconfirm>
    </>
  )
}

export default LayoutProfile
