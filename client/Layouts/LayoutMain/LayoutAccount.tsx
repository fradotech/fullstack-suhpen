import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Avatar, Dropdown, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'
import { authAction } from '../../Modules/Iam/Auth/auth.action'

type IProps = {
  children?: React.ReactNode
  headerRightMenu?: React.FC
  user: IUser
}

const LayoutAccount: React.FC<IProps> = (props: IProps) => {
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    authAction.logout() && location.replace(Route.Login)
  }

  return (
    <>
      <Dropdown
        trigger={['click']}
        arrow={{ pointAtCenter: true }}
        menu={{
          items: [
            {
              type: 'group',
              label: (
                <Link to="#" style={{ width: '6rem', margin: '6px' }}>
                  <Space size="small">
                    <Space.Compact direction="vertical" size="small">
                      <Typography.Text style={{ opacity: '80%' }}>
                        {props?.user?.email}
                      </Typography.Text>
                    </Space.Compact>
                  </Space>
                </Link>
              ),
            },
            {
              type: 'divider',
            },
            {
              key: '1',
              label: (
                <Link to={Route.Account} style={{ width: '6rem' }}>
                  <UserOutlined style={{ margin: '6px' }} /> My Account
                </Link>
              ),
            },
            {
              key: '2',
              label: (
                <Link to={Route.AccountEdit} style={{ width: '6rem' }}>
                  <SettingOutlined style={{ margin: '6px' }} /> Settings
                </Link>
              ),
            },
            {
              type: 'divider',
            },
            {
              key: '3',
              label: (
                <a onClick={handleLogout}>
                  <LogoutOutlined style={{ color: 'red', margin: '6px' }} />{' '}
                  Logout
                </a>
              ),
            },
          ],
        }}
      >
        <a style={{ color: 'black' }} onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar icon={<UserOutlined />} src={props?.user.avatar} />
            <Typography.Text>{props?.user?.name}</Typography.Text>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  )
}

export default LayoutAccount
