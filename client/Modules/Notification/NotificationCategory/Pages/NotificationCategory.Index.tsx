import { NotificationCategoryIndexRequest } from '@server/modules/notification/notification-category/infrastructure/notification-category-index.request'
import React from 'react'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DataTable from '../../../../Components/Organisms/DataTable/DataTable'
import { formatPagination } from '../../../../Components/Organisms/DataTable/DataTable.util'
import { useDataTable } from '../../../../Components/Organisms/DataTable/useDataTable'
import { Path } from '../../../../common/Path'
import { NotificationCategoryAction } from '../infrastructure/notification-category.action'
import { notificationCategoryColumns } from '../infrastructure/notification-category.column'

const NotificationCategoryIndex: React.FC = () => {
  const { query, setQueryParams } =
    useDataTable<NotificationCategoryIndexRequest>()
  const { isLoading, data, refetch } =
    NotificationCategoryAction.useIndex(query)

  return (
    <>
      <PageHeader title="NotificationCategory" />
      <Section>
        <DataTable
          columns={notificationCategoryColumns(refetch)}
          dataSource={data?.data}
          search={query.search}
          pagination={formatPagination(data?.meta)}
          loading={isLoading}
          onChange={(filtersState) => setQueryParams(filtersState)}
          dataTableHeader={{
            query,
            search: true,
            dateRangeColumn: 'createdAt',
            hrefCreate: Path.notificationCategory.form,
            hrefExport: Path.notificationCategory.export,
          }}
        />
      </Section>
    </>
  )
}

export default NotificationCategoryIndex
