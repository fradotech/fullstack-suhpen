import { PushNotificationIndexRequest } from '@server/modules/notification/push-notification/infrastructure/push-notification-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { formatPagination } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { NotificationCategoryAction } from '../../NotificationCategory/infrastructure/notification-category.action'
import { PushNotificationAction } from '../infrastructure/push-notification.action'
import { pushNotificationColumns } from '../infrastructure/push-notification.column'

const PushNotificationIndex: React.FC = () => {
  const { query, setQueryParams } = useDataTable<PushNotificationIndexRequest>()
  const { isLoading, data, refetch } = PushNotificationAction.useIndex(query)

  const {
    isLoading: isLoadingNotificationCategory,
    data: notificationCategories,
  } = NotificationCategoryAction.useIndex({ pageSize: 100000 })

  return (
    <>
      <PageHeader title="PushNotification" />
      <Section>
        <DataTable
          columns={pushNotificationColumns(
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
            dateRangeColumn: 'createdAt',
            hrefCreate: Path.pushNotification.form,
            hrefExport: Path.pushNotification.export,
          }}
        />
      </Section>
    </>
  )
}

export default PushNotificationIndex
