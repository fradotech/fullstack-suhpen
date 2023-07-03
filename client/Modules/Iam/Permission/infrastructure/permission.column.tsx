import { IPermission } from '@server/modules/iam/permission/infrastructure/permission.interface'
import { PermissionResponse } from '@server/modules/iam/permission/infrastructure/permission.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { PermissionMethodEnum } from '../../../../../@server/modules/iam/permission/common/permission.enum'
import { Modules } from '../../../../../@server/modules/modules'
import { RowActionButtons } from '../../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Path } from '../../../../common/Path'
import { Util } from '../../../../common/utils/util'

export const permissionColumns = (): ColumnsType<PermissionResponse> => {
  return [
    {
      title: 'Name',
      render: (data: IPermission) => {
        return <Tag color={data.labelColor}>{data.name}</Tag>
      },
    },
    { dataIndex: 'key' },
    {
      dataIndex: 'module',
      filters: Object.values(Modules).map((modules) => {
        return {
          text: modules,
          value: modules,
        }
      }),
    },

    {
      dataIndex: 'method',
      filters: Object.values(PermissionMethodEnum).map((method) => {
        return {
          text: method.name,
          value: method.name,
        }
      }),
    },
    { dataIndex: 'path' },
    {
      dataIndex: 'createdAt',
      render: (data: Date) => Util.formatDate(data),
    },
    {
      title: 'Actions',
      width: '120px',
      render: (data: PermissionResponse) => (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: Path.permission.id(data.id),
            },
            {
              type: 'edit',
              href: Path.permission.edit(data.id),
            },
          ]}
        />
      ),
    },
  ]
}
