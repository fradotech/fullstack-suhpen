import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { RoleAction } from '../infrastructure/role.action'
import { rolesColumns } from '../infrastructure/role.column'

const RoleIndex: React.FC = () => {
  const { isLoading, data } = RoleAction.useIndex()

  return (
    <>
      <PageHeader title="Role" />
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
