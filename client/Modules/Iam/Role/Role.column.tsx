import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import { ColumnsType } from 'antd/es/table'

export const rolesColumns: ColumnsType<RoleResponse> = [
  {
    dataIndex: 'name',
  },
]
