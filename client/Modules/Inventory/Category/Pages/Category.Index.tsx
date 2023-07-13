import { CategoryIndexRequest } from '@server/modules/inventory/category/infrastructure/category-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { formatPagination } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { CategoryAction } from '../infrastructure/category.action'
import { categoryColumns } from '../infrastructure/category.column'

const CategoryIndex: React.FC = () => {
  const { query, setQueryParams } = useDataTable<CategoryIndexRequest>()
  const { isLoading, data, refetch } = CategoryAction.useIndex(query)

  return (
    <>
      <PageHeader title="Category" />
      <Section>
        <DataTable
          columns={categoryColumns(refetch)}
          dataSource={data?.data}
          search={query.search}
          pagination={formatPagination(data?.meta)}
          loading={isLoading}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            dateRangeColumn: 'createdAt',
            hrefCreate: Path.category.form,
            hrefExport: Path.category.export,
          }}
        />
      </Section>
    </>
  )
}

export default CategoryIndex
