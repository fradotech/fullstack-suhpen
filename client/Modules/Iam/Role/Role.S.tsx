import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import React from 'react'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable, {
  paginationTransform,
} from '../../../Components/Organs/DataTable/DataTable'
import { roleAction } from './role.action'
import { rolesColumns } from './Role.column'

const RoleS: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [props, setProps] = React.useState<IPaginateResponse<RoleResponse>>()
  const fetch = async () => setProps(await roleAction.fetch())

  React.useEffect(() => {
    setIsLoading(true)
    fetch()
    setIsLoading(false)
  }, [])

  return (
    <>
      <PageHeader title="Role" isLoading={isLoading} />
      <DataTable
        rowKey="id"
        columns={rolesColumns}
        dataSource={props?.data}
        pagination={paginationTransform(props?.meta)}
        loading={isLoading}
      />
    </>
  )
}

export default RoleS
