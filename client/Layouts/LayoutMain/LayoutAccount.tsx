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
import { authAction } from '../../Modules/Iam/Auth/infrastructure/auth.action'
import { themeColors, themeColorsDark } from '../ThemeProvider/theme'

type IProps = {
  children?: React.ReactNode
  headerRightMenu?: React.FC
  user: IUser
  isDarkMode: boolean
}

const LayoutAccount: React.FC<IProps> = (props: IProps) => {
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    authAction.logout() && location.replace(Route.login)
  }

  return (
    <>
      <Dropdown
        trigger={['click']}
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
              key: 'My Account',
              label: (
                <Link to={Route.account} style={{ width: '6rem' }}>
                  <UserOutlined style={{ margin: '6px' }} /> My Account
                </Link>
              ),
            },
            {
              key: 'Settings',
              label: (
                <Link to={Route.accountEdit} style={{ width: '6rem' }}>
                  <SettingOutlined style={{ margin: '6px' }} /> Settings
                </Link>
              ),
            },
            {
              type: 'divider',
            },
            {
              key: 'Logout',
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
        <a
          onClick={(e) => e.preventDefault()}
          style={{
            color: props.isDarkMode ? themeColors.solid : themeColorsDark.solid,
          }}
        >
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
