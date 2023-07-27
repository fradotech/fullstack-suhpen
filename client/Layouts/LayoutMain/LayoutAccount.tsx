import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Avatar, Dropdown, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { AuthAction } from '../../Modules/Iam/Auth/infrastructure/auth.action'
import { Path } from '../../common/Path'
import { themeColors, themeColorsDark } from '../ThemeProvider/theme'

type IProps = {
  user: IUser
  isDarkMode: boolean
}

const LayoutAccount: React.FC<IProps> = (props: IProps) => {
  const handleLogout = () => AuthAction.logout() && location.replace(Path.login)

  return (
    <div style={{ marginLeft: '12px' }}>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            {
              type: 'group',
              label: (
                <Link to="#" style={{ width: '6rem', margin: 6 }}>
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
                <Link to={Path.account.index} style={{ width: '6rem' }}>
                  <UserOutlined style={{ margin: 6 }} /> My Account
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
                  <LogoutOutlined
                    style={{ color: 'red', margin: '0px 10px 0px 6px' }}
                  />
                  Logout
                </a>
              ),
            },
          ],
        }}
      >
        <a
          style={{
            color: props.isDarkMode ? themeColors.solid : themeColorsDark.solid,
          }}
        >
          <Space>
            <Avatar icon={<UserOutlined />} src={props.user.avatar} />
            <Typography.Text>{props.user.name}</Typography.Text>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default LayoutAccount
