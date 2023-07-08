import { ProductIndexRequest } from '@server/modules/inventory/product/infrastructure/product-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { CategoryAction } from '../../Category/infrastructure/category.action'
import { ProductAction } from '../infrastructure/product.action'
import { productColumns } from '../infrastructure/product.column'

const ProductIndex: React.FC = () => {
  const { query, setQueryParams } = useDataTable<ProductIndexRequest>()
  const { isLoading, data, refetch } = ProductAction.useIndex(query)

  const { isLoading: isLoadingCategories, data: categories } =
    CategoryAction.useIndex({ pageSize: 100000 })

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
            dateRangeColumn: 'createdAt',
            hrefCreate: Path.product.form,
            hrefExport: Path.product.export,
          }}
        />
      </Section>
    </>
  )
}

export default ProductIndex
