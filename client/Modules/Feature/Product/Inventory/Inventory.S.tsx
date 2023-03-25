import { InventoryIndexRequest } from '@server/modules/feature/inventory/infrastructure/inventory-index.request'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Route } from '../../../../Enums/Route'
import { inventoryAction } from './inventory.action'
import { inventoryColumns } from './Inventory.column'

interface IProps {
  productId?: string
}

const InventoryS: React.FC<IProps> = (props: IProps) => {
  const { query, setQueryParams } = useDataTable<InventoryIndexRequest>()
  const fetch = async () => await inventoryAction.fetch(query, props.productId)
  const { isLoading, data } = useQuery([InventoryS.name, query], fetch)

  return (
    <>
      <PageHeader title="Inventory" />
      <DataTable
        rowKey="id"
        columns={inventoryColumns}
        dataSource={data?.data}
        search={query.search}
        pagination={!props.productId && paginationTransform(data?.meta)}
        loading={isLoading}
        onChange={(filtersState) => setQueryParams(filtersState)}
        dataTableHeader={{
          query,
          search: true,
          hrefCreate: props.productId && Route.inventory.form(props.productId),
          hrefExport: Route.inventory.export,
        }}
      />
    </>
  )
}

export default InventoryS
