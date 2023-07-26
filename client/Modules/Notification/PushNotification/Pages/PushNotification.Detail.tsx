import { Card } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { PushNotificationReadAction } from '../infrastructure/push-notification-read.action'

const PushNotificationDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await PushNotificationReadAction.findOne(id)
  const { data } = useQuery([PushNotificationDetail.name, id], fetch)

  return (
    <>
      <PageHeader title="Notification" />
      <Card bordered={false} title={data?.data.title}>
        {data?.data.message}
      </Card>
    </>
  )
}

export default PushNotificationDetail
