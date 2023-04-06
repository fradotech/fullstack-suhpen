import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Button, Card, Dropdown, Popconfirm, Tooltip } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { isMobileScreen } from '../../../utils/is-mobile'

type ButtonType = 'view' | 'edit' | 'delete' | 'approve' | 'reject' | 'submit'

interface IRowActionButtonsProps {
  type?: ButtonType
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
}

interface IRowActionProps {
  actions: IRowActionButtonsProps[]
}

export const RowActionButtons: React.FC<IRowActionProps> = ({ actions }) => {
  const isMobile = isMobileScreen()

  const renderButton = (action: IRowActionButtonsProps) => {
    if (!action) return null

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

        case 'submit':
          icon = <SendOutlined style={{ color: 'blue' }} />
          break

        default:
          break
      }
    }

    return (
      <Tooltip title={action.type} key={action.type}>
        {action.type == 'view' || action.type == 'edit' ? (
          <Link to={action.href || '#'}>
            <Button
              type="text"
              shape="circle"
              onClick={action.onClick}
              icon={icon}
              disabled={action.disabled}
            />
          </Link>
        ) : (
          <Popconfirm
            title={`Are you sure want to ${action.type}?`}
            onConfirm={action.onClick}
          >
            <Button
              type="text"
              shape="circle"
              icon={icon}
              disabled={action.disabled}
            />
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
          <>{actions.slice(0, 3).map((action) => renderButton(action))}</>
        </Card>
      }
      placement="bottomLeft"
    >
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  ) : (
    <>{actions.map((action) => renderButton(action))}</>
  )
}
