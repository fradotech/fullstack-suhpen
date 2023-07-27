import { NotificationTemplateIndexRequest } from '@server/modules/notification/notification-template/infrastructure/notification-template-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { formatPagination } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { NotificationTemplateAction } from '../infrastructure/notification-template.action'
import { notificationTemplateColumns } from '../infrastructure/notification-template.column'

const NotificationTemplateIndex: React.FC = () => {
  const { query, setQueryParams } =
    useDataTable<NotificationTemplateIndexRequest>()
  const { isLoading, data, refetch } =
    NotificationTemplateAction.useIndex(query)

  return (
    <>
      <PageHeader title="NotificationTemplate" />
      <Section>
        <DataTable
          columns={notificationTemplateColumns(refetch)}
          dataSource={data?.data}
          search={query.search}
          pagination={formatPagination(data?.meta)}
          loading={isLoading}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            dateRangeColumn: 'createdAt',
            hrefCreate: Path.notificationTemplate.form,
            hrefExport: Path.notificationTemplate.sheet.export,
          }}
        />
      </Section>
    </>
  )
}

export default NotificationTemplateIndex
