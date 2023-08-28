import { LogActivityIndexRequest } from '@server/modules/setting/logger/v1/log-activity-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { formatPagination } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { LogActivityAction } from '../infrastructure/log-activity.action'
import { logActivityColumns } from '../infrastructure/log-activity.column'

const LogActivityIndex: React.FC = () => {
  const { query, setQueryParams } = useDataTable<LogActivityIndexRequest>()
  const { isLoading, data } = LogActivityAction.useIndex(query)

  return (
    <>
      <PageHeader title="LogActivity" />
      <Section>
        <DataTable
          columns={logActivityColumns()}
          dataSource={data?.data}
          search={query.search}
          pagination={formatPagination(data?.meta)}
          loading={isLoading}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            dateRangeColumn: 'createdAt',
            hrefExport: Path.logActivity.sheet.export,
          }}
        />
      </Section>
    </>
  )
}

export default LogActivityIndex
