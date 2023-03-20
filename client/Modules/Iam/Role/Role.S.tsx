import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable from '../../../Components/Organisms/DataTable/DataTable'
import { roleAction } from './role.action'
import { rolesColumns } from './Role.column'

const RoleS: React.FC = () => {
  const fetch = async () => await roleAction.fetch()
  const { isLoading, data } = useQuery([RoleS.name], fetch)

  return (
    <>
      <PageHeader title="Role" isLoading={isLoading} />
      <DataTable
        rowKey="id"
        columns={rolesColumns}
        dataSource={data?.data}
        loading={isLoading}
      />
    </>
  )
}

export default RoleS
