import { CategoryIndexRequest } from '@server/modules/feature/category/infrastructure/category-index.request'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable from '../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../Components/Organisms/DataTable/useDataTable'
import { Route } from '../../../Enums/Route'
import { categoryAction } from './category.action'
import { categoryColumns } from './Category.column'

const CategoryS: React.FC = () => {
  const { query, setQueryParams } = useDataTable<CategoryIndexRequest>()
  const fetch = async () => await categoryAction.fetch(query)
  const { isLoading, data } = useQuery([CategoryS.name, query], fetch)

  return (
    <>
      <PageHeader title="Category" />
      <DataTable
        rowKey="id"
        columns={categoryColumns}
        dataSource={data?.data}
        search={query.search}
        pagination={paginationTransform(data?.meta)}
        loading={isLoading}
        onChange={(filtersState) => setQueryParams(filtersState)}
        dataTableHeader={{
          query,
          search: true,
          hrefCreate: Route.category.form,
          hrefExport: Route.category.export,
        }}
      />
    </>
  )
}

export default CategoryS
