import { RoleIndexRequest } from '@server/modules/iam/role/infrastructure/role-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { formatPagination } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { RoleAction } from '../infrastructure/role.action'
import { roleColumns } from '../infrastructure/role.column'

const RoleIndex: React.FC = () => {
  const { query, setQueryParams } = useDataTable<RoleIndexRequest>()
  const { isLoading, data, refetch } = RoleAction.useIndex(query)

  return (
    <>
      <PageHeader title="Role" />
      <Section>
        <DataTable
          columns={roleColumns(refetch)}
          dataSource={data?.data}
          search={query.search}
          pagination={formatPagination(data?.meta)}
          loading={isLoading}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            dateRangeColumn: 'createdAt',
            hrefCreate: Path.role.form,
            hrefExport: Path.role.sheet.export,
          }}
        />
      </Section>
    </>
  )
}

export default RoleIndex
