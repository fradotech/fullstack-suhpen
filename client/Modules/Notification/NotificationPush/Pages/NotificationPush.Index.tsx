import { NotificationPushIndexRequest } from '@server/modules/notification/notification-push/infrastructure/notification-push-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { formatPagination } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { NotificationCategoryAction } from '../../NotificationCategory/infrastructure/notification-category.action'
import { NotificationPushAction } from '../infrastructure/notification-push.action'
import { notificationPushColumns } from '../infrastructure/notification-push.column'

const NotificationPushIndex: React.FC = () => {
  const { query, setQueryParams } = useDataTable<NotificationPushIndexRequest>()
  const { isLoading, data, refetch } = NotificationPushAction.useIndex(query)

  const {
    isLoading: isLoadingNotificationCategory,
    data: notificationCategories,
  } = NotificationCategoryAction.useIndex({ pageSize: 1000 })

  return (
    <>
      <PageHeader title="NotificationPush" />
      <Section>
        <DataTable
          columns={notificationPushColumns(
            refetch,
            notificationCategories?.data,
          )}
          dataSource={data?.data}
          search={query.search}
          pagination={formatPagination(data?.meta)}
          loading={isLoading || isLoadingNotificationCategory}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            dateRangeColumn: 'pushAt',
            hrefCreate: Path.notificationPush.form,
            hrefExport: Path.notificationPush.sheet.export,
          }}
        />
      </Section>
    </>
  )
}

export default NotificationPushIndex
