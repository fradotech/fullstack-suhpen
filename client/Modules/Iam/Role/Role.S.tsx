import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { RoleIndexRequest } from '@server/modules/iam/role/infrastructure/role.request'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import React from 'react'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable, {
  paginationTransform,
} from '../../../Components/Organs/DataTable/DataTable'
import { useDataTable } from '../../../Components/Organs/DataTable/useDataTable'
import { roleAction } from './role.action'
import { rolesColumns } from './Role.column'

const RoleS: React.FC = () => {
  const [props, setProps] = React.useState<IPaginateResponse<RoleResponse>>()
  const { status } = useDataTable<RoleIndexRequest>()
  const fetch = async () => setProps(await roleAction.fetch())

  React.useEffect(() => {
    status.isFetching = true
    fetch()
    status.isFetching = false
  }, [status])

  return (
    <>
      <PageHeader title="Role" isLoading={status.isFetching} />
      <DataTable
        rowKey="id"
        columns={rolesColumns}
        dataSource={props?.data}
        pagination={paginationTransform(props?.meta)}
        loading={status.isFetching}
      />
    </>
  )
}

export default RoleS
