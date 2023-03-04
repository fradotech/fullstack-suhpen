import { UserOutlined } from '@ant-design/icons'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { Avatar, Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from '../../Enums/Route'

type IProps = {
  children?: React.ReactNode
  headerRightMenu?: React.FC
  user: IUser
}

const LayoutProfile: React.FC<IProps> = (props: IProps) => {
  return (
    <Link to={Route.Profile} style={{ width: '6rem' }}>
      <Space size="small">
        <Avatar icon={<UserOutlined />} src={props?.user.avatar} />
        <Space.Compact direction="vertical" size="small">
          <Typography.Text>{props?.user?.name}</Typography.Text>
        </Space.Compact>
      </Space>
    </Link>
  )
}

export default LayoutProfile
