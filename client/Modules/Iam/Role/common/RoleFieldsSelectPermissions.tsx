import { FormInstance } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'
import React from 'react'
import { IPermission } from '../../../../../@server/modules/iam/permission/infrastructure/permission.interface'
import PermissionIndex from '../../Permission/Pages/Permission.Index'

interface IProps {
  form: FormInstance
}

const RoleFieldsSelectPermissions: React.FC<IProps> = (props: IProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([])

  React.useMemo(() => {
    const permissions: IPermission[] = props.form.getFieldValue('permissions')
    const permissionIds = permissions?.map((item) => item.id)

    const permissionIdsUnique = permissionIds
      ? [...new Set([...selectedRowKeys, ...permissionIds])]
      : [...selectedRowKeys]

    setSelectedRowKeys(permissionIdsUnique)
  }, [props.form.getFieldValue('permissions')])

  const rowSelection: TableRowSelection<IPermission> = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      const permissionIdsUnique = [...new Set([...keys, ...selectedRowKeys])]
      setSelectedRowKeys(permissionIdsUnique)
      props.form.setFieldValue('permissionIds', permissionIdsUnique)
    },
  }

  return <PermissionIndex rowSelection={rowSelection} />
}

export default RoleFieldsSelectPermissions
