import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user-index.request'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable, {
  paginationTransform,
} from '../../../Components/Organs/DataTable/DataTable'
import { useDataTable } from '../../../Components/Organs/DataTable/useDataTable'
import { Route } from '../../../Enums/Route'
import { userAction } from './user.action'
import { usersColumns } from './User.column'

const UserS: React.FC = () => {
  const { query, setQueryParams } = useDataTable<UserIndexRequest>()
  const fetch = async () => await userAction.fetch(query)
  const { isLoading, data } = useQuery([UserS.name, query], fetch)

  return (
    <>
      <PageHeader title="User" />
      <DataTable
        rowKey="id"
        columns={usersColumns}
        dataSource={data?.data}
        search={query.search}
        pagination={paginationTransform(data?.meta)}
        loading={isLoading}
        onChange={(filtersState) => setQueryParams(filtersState)}
        dataTableHeader={{
          search: true,
          query,
          hrefCreate: Route.UserForm,
          hrefExport: Route.UserExport,
          dateRange: (dateRange) => {
            setQueryParams({
              startAt: dateRange?.[0]?.toISOString(),
              endAt: dateRange?.[1]?.toISOString(),
            })
          },
        }}
      />
    </>
  )
}

export default UserS
