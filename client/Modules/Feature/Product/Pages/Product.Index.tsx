import { ProductIndexRequest } from '@server/modules/feature/product/infrastructure/product-index.request'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Route } from '../../../../Enums/Route'
import useCategories from '../../Category/infrastructure/useCategories'
import { productAction } from '../infrastructure/product.action'
import { productColumns } from '../infrastructure/product.column'

const ProductIndex: React.FC = () => {
  const { query, setQueryParams } = useDataTable<ProductIndexRequest>()
  const fetch = async () => await productAction.fetch(query)
  const { isLoading: isLoadingCategories, data: categories } = useCategories()
  const { isLoading, data, refetch } = useQuery(
    [ProductIndex.name, query],
    fetch,
  )

  return (
    <>
      <PageHeader title="Product" />
      <Section>
        <DataTable
          rowKey="id"
          columns={productColumns(categories?.data, refetch)}
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
      </Section>
    </>
  )
}

export default ProductIndex
