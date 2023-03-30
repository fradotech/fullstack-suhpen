import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user-index.request'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../Components/Molecules/Section/Section'
import DataTable from '../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../Components/Organisms/DataTable/useDataTable'
import { Route } from '../../../Enums/Route'
import { userAction } from './user.action'
import { userColumns } from './User.column'

const UserS: React.FC = () => {
  const { query, setQueryParams } = useDataTable<UserIndexRequest>()
  const fetch = async () => await userAction.fetch(query)
  const { isLoading, data } = useQuery([UserS.name, query], fetch)

  return (
    <Section>
      <PageHeader title="User" />
      <DataTable
        rowKey="id"
        columns={userColumns}
        dataSource={data?.data}
        search={query.search}
        pagination={paginationTransform(data?.meta)}
        loading={isLoading}
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
  )
}

export default UserS
