import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { UserIndexRequest } from '@server/modules/iam/user/infrastructure/user-index.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import React from 'react'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable, {
  paginationTransform,
} from '../../../Components/Organs/DataTable/DataTable'
import { useDataTable } from '../../../Components/Organs/DataTable/useDataTable'
import { Route } from '../../../Enums/Route'
import { userAction } from './user.action'
import { usersColumns } from './User.column'

const UserS: React.FC = () => {
  const [props, setProps] = React.useState<IPaginateResponse<UserResponse>>()
  const { setQueryParams, query, status } = useDataTable<UserIndexRequest>()
  const fetch = async () => {
    status.isFetching = true
    setProps(await userAction.fetch(query))
    status.isFetching = false
  }

  React.useEffect(() => {
    fetch()
  }, [query])

  return (
    <>
      <PageHeader title="User" />
      <DataTable
        rowKey="id"
        columns={usersColumns}
        dataSource={props?.data}
        search={query.search}
        pagination={paginationTransform(props?.meta)}
        loading={status.isFetching}
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
