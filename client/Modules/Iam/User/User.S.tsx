import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user-index.request'
import React from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable, {
  paginationTransform,
} from '../../../Components/Organs/DataTable/DataTable'
import { useDataTable } from '../../../Components/Organs/DataTable/useDataTable'
import { Route } from '../../../Enums/Route'
import { userAction } from './user.action'
import { usersColumns } from './User.column'

const UserS: React.FC = () => {
  const { setQueryParams, query } = useDataTable<UserIndexRequest>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { isLoading, data } = useQuery([UserS.name, query], async () => {
    searchParams // TODO
    const queryEntries = Object.entries(query).filter(([{}, data]) => data)
    setSearchParams(Object.fromEntries(queryEntries))
    return await userAction.fetch(query)
  })

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
        dataTableHeader={{
          search: true,
          dateRange: true,
          query,
          hrefCreate: Route.UserForm,
          hrefExport: Route.UserExport,
        }}
        onChange={({ dateRange, ...filtersState }) => {
          setQueryParams({
            ...filtersState,
            startAt: dateRange?.[0]?.toISOString(),
            endAt: dateRange?.[1]?.toISOString(),
          })
        }}
      />
    </>
  )
}

export default UserS
