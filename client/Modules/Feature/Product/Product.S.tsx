import { ProductIndexRequest } from '@server/modules/feature/product/infrastructure/product-index.request'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DataTable, {
  paginationTransform,
} from '../../../Components/Organisms/DataTable/DataTable'
import { useDataTable } from '../../../Components/Organisms/DataTable/useDataTable'
import { Route } from '../../../Enums/Route'
import { productAction } from './product.action'
import { productsColumns } from './Product.column'

const ProductS: React.FC = () => {
  const { query, setQueryParams } = useDataTable<ProductIndexRequest>()
  const fetch = async () => await productAction.fetch(query)
  const { isLoading, data } = useQuery([ProductS.name, query], fetch)

  return (
    <>
      <PageHeader title="Product" />
      <DataTable
        rowKey="id"
        columns={productsColumns}
        dataSource={data?.data}
        search={query.search}
        pagination={paginationTransform(data?.meta)}
        loading={isLoading}
        onChange={(filtersState) => setQueryParams(filtersState)}
        dataTableHeader={{
          query,
          search: true,
          dateRange: true,
          hrefCreate: Route.product.form,
          hrefExport: Route.product.export,
        }}
      />
    </>
  )
}

export default ProductS
