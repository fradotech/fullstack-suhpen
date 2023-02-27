import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Popconfirm, Space, Tooltip } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <Space direction="vertical">
      <Space wrap>{actions.map((action) => renderButton(action))}</Space>
    </Space>
  )
}
