import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { Button, Card, Dropdown, Popconfirm, Space, Tooltip } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { isMobileScreen } from '../../../utils/is-mobile'

type ButtonType = 'view' | 'edit' | 'delete' | 'approve' | 'reject'

interface IRowActionButtonsProps {
  type?: ButtonType
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
}

interface IRowActionProps {
  actions: IRowActionButtonsProps[]
}

export const RowActionButtons: React.FC<IRowActionProps> = ({ actions }) => {
  const isMobile = isMobileScreen()

  const renderButton = (action: IRowActionButtonsProps) => {
    let { icon } = action

    if (!icon) {
      switch (action.type) {
        case 'view':
          icon = <EyeOutlined style={{ color: 'green' }} />
          break

        case 'edit':
          icon = <EditOutlined style={{ color: 'blue' }} />
          break

        case 'delete':
          icon = <DeleteOutlined style={{ color: 'red' }} />
          break

        case 'approve':
          icon = <CheckCircleOutlined style={{ color: 'green' }} />
          break

        case 'reject':
          icon = <CloseCircleOutlined style={{ color: 'red' }} />
          break

        default:
          break
      }
    }

    return (
      <Tooltip title={action.type} key={action.type}>
        {action.type == 'view' || action.type == 'edit' ? (
          <Link to={action.href || '#'} onClick={action.onClick}>
            {icon}
          </Link>
        ) : (
          <Popconfirm
            title={`Are you sure want to ${action.type}?`}
            onConfirm={action.onClick}
          >
            {icon}
          </Popconfirm>
        )}
      </Tooltip>
    )
  }

  return isMobile ? (
    <Dropdown
      trigger={['click']}
      overlay={
        <Card size="small">
          <Space wrap>
            {actions.slice(0, 3).map((action) => renderButton(action))}
          </Space>
        </Card>
      }
      placement="bottomLeft"
    >
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  ) : (
    <Space direction="vertical">
      <Space wrap>{actions.map((action) => renderButton(action))}</Space>
    </Space>
  )
}
