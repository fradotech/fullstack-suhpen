import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { formatPagination } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { RoleAction } from '../../Role/infrastructure/role.action'
import { UserAction } from '../infrastructure/user.action'
import { userColumns } from '../infrastructure/user.column'

const UserIndex: React.FC = () => {
  const { query, setQueryParams } = useDataTable<UserIndexRequest>()
  const { isLoading, data, refetch } = UserAction.useIndex(query)

  const { isLoading: isLoadingRoles, data: roles } = RoleAction.useIndex({
    pageSize: 1000,
  })

  return (
    <>
      <PageHeader title="User" />
      <Section>
        <DataTable
          columns={userColumns(refetch, roles?.data)}
          dataSource={data?.data}
          search={query.search}
          pagination={formatPagination(data?.meta)}
          loading={isLoading || isLoadingRoles}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            dateRangeColumn: 'createdAt',
            hrefCreate: Path.user.form,
            hrefExport: Path.user.sheet.export,
          }}
        />
      </Section>
    </>
  )
}

export default UserIndex
