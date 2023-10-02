import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { Util } from '../../../../client/common/utils/util'

export const temperaturesColumns: ColumnsType<any> = [
  {
    title: 'Nama Penyu',
    dataIndex: 'name',
  },
  {
    title: 'Nomor Ruangan',
    dataIndex: 'room',
  },
  {
    title: 'Suhu',
    render: (data: any) => data.amount + '° C',
  },
  {
    title: 'Role',
    render: (data: any) => {
      if (data.status == 'safe') return <Tag color="green">{data.status}</Tag>
      else if (data.status == 'warning')
        return <Tag color="yellow">{data.status}</Tag>
      else if (data.status == 'danger')
        return <Tag color="red">{data.status}</Tag>

      return <Tag color="red">Error</Tag>
    },
  },
  {
    title: 'Waktu',
    render: (data: any) => Util.formatDate(data.createdAt),
  },
]
