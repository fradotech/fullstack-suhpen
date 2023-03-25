import { ProductIndexRequest } from '@server/modules/feature/product/infrastructure/product-index.request'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable from '../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../Components/Organisms/DataTable/useDataTable'
import { Route } from '../../../Enums/Route'
import { categoryAction } from '../Category/category.action'
import { productAction } from './product.action'
import { productColumns } from './Product.column'

const ProductS: React.FC = () => {
  const { query, setQueryParams } = useDataTable<ProductIndexRequest>()
  const fetch = async () => await productAction.fetch(query)
  const { isLoading, data } = useQuery([ProductS.name, query], fetch)

  const fetchCategories = async () =>
    await categoryAction.fetch({ pageSize: 100000 })
  const { isLoading: isLoadingCategories, data: dataCategories } = useQuery(
    [ProductS.name + '/categories', query],
    fetchCategories,
  )

  return (
    <>
      <PageHeader title="Product" />
      <DataTable
        rowKey="id"
        columns={productColumns(dataCategories?.data)}
        dataSource={data?.data}
        search={query.search}
        pagination={paginationTransform(data?.meta)}
        loading={isLoading || isLoadingCategories}
        onChange={(filtersState) => setQueryParams(filtersState)}
        dataTableHeader={{
          query,
          search: true,
          hrefCreate: Route.product.form,
          hrefExport: Route.product.export,
        }}
      />
    </>
  )
}

export default ProductS
