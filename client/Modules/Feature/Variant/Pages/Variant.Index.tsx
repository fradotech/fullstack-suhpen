import { VariantIndexRequest } from '@server/modules/feature/variant/infrastructure/variant-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { VariantAction } from '../infrastructure/variant.action'
import { variantColumns } from '../infrastructure/variant.column'

interface IProps {
  productId?: string
}

const VariantIndex: React.FC<IProps> = (props: IProps) => {
  const { query, setQueryParams } = useDataTable<VariantIndexRequest>()
  const { isLoading, data, refetch } = VariantAction.useIndex(
    query,
    props.productId,
  )

  return (
    <>
      <PageHeader title="Variant" />
      <Section>
        <DataTable
          rowKey="id"
          columns={variantColumns(refetch)}
          dataSource={data?.data}
          search={query.search}
          pagination={!props.productId && paginationTransform(data?.meta)}
          loading={isLoading}
          onChange={(filtersState) => {
            props.productId && (filtersState.pageSize = 100000)
            setQueryParams(filtersState)
          }}
          dataTableHeader={{
            query,
            search: true,
            dateRangeColumn: 'expiredDate',
            hrefCreate: props.productId && Path.variant.form(props.productId),
            hrefExport: Path.variant.export,
          }}
        />
      </Section>
    </>
  )
}

export default VariantIndex
