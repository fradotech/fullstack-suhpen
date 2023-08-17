import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Button, Card, Dropdown, Popconfirm, Tooltip } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { PermissionMethodEnum } from '../../../../@server/modules/iam/permission/common/permission.enum'
import isHasPermission from '../../../Modules/Iam/Role/Components/isHasPermission'
import { useMobileScreen } from '../../../common/useMobileScreen'
import useModules from '../../../common/useModules'

type TButton = 'view' | 'edit' | 'delete' | 'approve' | 'reject' | 'submit'

interface IRowActionButtonsProps {
  type?: TButton
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
}

interface IRowActionProps {
  actions: IRowActionButtonsProps[]
}

export const RowActionButtons: React.FC<IRowActionProps> = ({ actions }) => {
  const { isMobile } = useMobileScreen()
  const { modules } = useModules()

  const renderButton = (action: IRowActionButtonsProps) => {
    if (!action) return null

    let { icon } = action

    if (!icon) {
      switch (action.type) {
        case 'view':
          icon = <EyeOutlined style={{ color: 'green' }} />
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
        {action.type === 'view' || action.type === 'edit' ? (
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

  const renderIfHasPermission = actions.map((action) => {
    let permissionKey: string

    if (!action.href) {
      permissionKey = `${PermissionMethodEnum.Delete}/${modules}/:id`
    } else {
      permissionKey = `${PermissionMethodEnum.Get}/${modules}/:id`
    }

    return isHasPermission([permissionKey]) && renderButton(action)
  })

  return isMobile ? (
    <Dropdown
      trigger={['click']}
      menu={{
        items: [
          {
            type: 'group',
            label: (
              <Card size="small">
                <>{renderIfHasPermission}</>
              </Card>
            ),
          },
        ],
      }}
    >
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  ) : (
    <>{renderIfHasPermission}</>
  )
}
