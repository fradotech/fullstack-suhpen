import { ColumnsType } from 'antd/es/table'
import { LogActivityResponse } from '../../../../../@server/modules/setting/logger/infrastructure/log-activity.response'

import { PermissionMethodEnum } from '../../../../../@server/modules/iam/permission/common/permission.enum'
import { RowActionButtons } from '../../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Path } from '../../../../common/Path'
import { Util } from '../../../../common/utils/util'

export const logActivityColumns = (): ColumnsType<LogActivityResponse> => {
  return [
    {
      dataIndex: 'method',
      filters: Object.values(PermissionMethodEnum).map((data) => {
        return {
          text: data,
          value: data,
        }
      }),
    },
    {
      dataIndex: 'path',
    },
    {
      title: 'Time (ms)',
      dataIndex: 'executeTimeInMs',
    },
    {
      dataIndex: 'remoteAddress',
    },
    {
      dataIndex: 'createdAt',
      render: (data: Date) => Util.formatDate(data),
    },
    {
      title: 'Actions',
      width: '40px',
      render: (data: LogActivityResponse) => (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: Path.logActivity.id(data.id),
            },
          ]}
        />
      ),
    },
  ]
}
