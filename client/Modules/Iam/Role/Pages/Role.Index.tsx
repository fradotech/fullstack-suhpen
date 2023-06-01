import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { roleAction } from '../infrastructure/role.action'
import { rolesColumns } from '../infrastructure/role.column'

const RoleIndex: React.FC = () => {
  const fetch = async () => await roleAction.fetch()
  const { isLoading, data } = useQuery([RoleIndex.name], fetch)

  return (
    <>
      <PageHeader title="Role" isLoading={isLoading} />
      <Section>
        <DataTable
          rowKey="id"
          columns={rolesColumns}
          dataSource={data?.data}
          loading={isLoading}
        />
      </Section>
    </>
  )
}

export default RoleIndex
