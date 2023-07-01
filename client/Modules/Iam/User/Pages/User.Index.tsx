import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Route } from '../../../../Enums/Route'
import { RoleAction } from '../../Role/infrastructure/role.action'
import { UserAction } from '../infrastructure/user.action'
import { userColumns } from '../infrastructure/user.column'

const UserIndex: React.FC = () => {
  const { query, setQueryParams } = useDataTable<UserIndexRequest>()
  const { isLoading, data, refetch } = UserAction.useIndex(query)

  const { isLoading: isLoadingRoles, data: roles } = RoleAction.useIndex()

  return (
    <>
      <PageHeader title="User" />
      <Section>
        <DataTable
          rowKey="id"
          columns={userColumns(roles?.data, refetch)}
          dataSource={data?.data}
          search={query.search}
          pagination={paginationTransform(data?.meta)}
          loading={isLoading || isLoadingRoles}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            dateRangeColumn: 'createdAt',
            hrefCreate: Route.user.form,
            hrefExport: Route.user.export,
          }}
        />
      </Section>
    </>
  )
}

export default UserIndex
