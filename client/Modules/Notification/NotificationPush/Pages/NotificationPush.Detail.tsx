import { Card } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { NotificationPushReadAction } from '../infrastructure/notification-push-read.action'

const NotificationPushDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await NotificationPushReadAction.findOne(id)
  const { data } = useQuery([NotificationPushDetail.name, id], fetch)

  return (
    <>
      <PageHeader title="Notification" />
      <Card bordered={false} title={data?.data.title}>
        {data?.data.message}
      </Card>
    </>
  )
}

export default NotificationPushDetail
