import { InventoryIndexRequest } from '@server/modules/feature/inventory/infrastructure/inventory-index.request'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Route } from '../../../../Enums/Route'
import { inventoryAction } from '../infrastructure/inventory.action'
import { inventoryColumns } from '../infrastructure/inventory.column'

interface IProps {
  productId?: string
}

const InventoryIndex: React.FC<IProps> = (props: IProps) => {
  const { query, setQueryParams } = useDataTable<InventoryIndexRequest>()
  const fetch = async () => await inventoryAction.fetch(query, props.productId)
  const { isLoading, data, refetch } = useQuery(
    [InventoryIndex.name, query],
    fetch,
  )

  return (
    <>
      <PageHeader title="Inventory" />
      <Section>
        <DataTable
          rowKey="id"
          columns={inventoryColumns(refetch)}
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
            hrefCreate:
              props.productId && Route.inventory.form(props.productId),
            hrefExport: Route.inventory.export,
          }}
        />
      </Section>
    </>
  )
}

export default InventoryIndex
