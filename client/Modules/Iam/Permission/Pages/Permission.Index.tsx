import { PermissionIndexRequest } from '@server/modules/iam/permission/infrastructure/permission-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { paginationTransform } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { PermissionAction } from '../infrastructure/permission.action'
import { permissionColumns } from '../infrastructure/permission.column'

interface IProps {
  roleId?: string
}

const PermissionIndex: React.FC<IProps> = (props: IProps) => {
  const { query, setQueryParams } = useDataTable<PermissionIndexRequest>()
  const { isLoading, data } = PermissionAction.useIndex(query, props.roleId)

  return (
    <>
      <PageHeader title="Permission" />
      <Section>
        <DataTable
          rowKey="id"
          columns={permissionColumns()}
          dataSource={data?.data}
          search={query.search}
          pagination={paginationTransform(data?.meta)}
          loading={isLoading}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            hrefExport: Path.permission.export,
          }}
        />
      </Section>
    </>
  )
}

export default PermissionIndex
