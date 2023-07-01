import { CategoryIndexRequest } from '@server/modules/feature/category/infrastructure/category-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../Enums/Path'
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
          rowKey="id"
          columns={categoryColumns(refetch)}
          dataSource={data?.data}
          search={query.search}
          pagination={paginationTransform(data?.meta)}
          loading={isLoading}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            hrefCreate: Path.category.form,
            hrefExport: Path.category.export,
          }}
        />
      </Section>
    </>
  )
}

export default CategoryIndex
