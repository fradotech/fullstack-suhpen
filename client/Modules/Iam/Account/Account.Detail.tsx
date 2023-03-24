import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Descriptions, Image, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import DescriptionContainer from '../../../Components/Organisms/Description/DescriptionContainer'
import { Util } from '../../../utils/util'
import { accountAction } from './account.action'

const AccountDetail: React.FC = () => {
  const fetch = async () => await accountAction.getUserLogged()
  const { isLoading, data } = useQuery([AccountDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader title="Account" isLoading={isLoading} />
      <Row>
        <Avatar
          size={250}
          icon={<UserOutlined />}
          style={{ margin: '32px' }}
          src={data?.data.avatar}
        />
        <DescriptionContainer>
          {fields?.map((key) => {
            if (
              key == 'avatar' ||
              key == 'image' ||
              key == 'thumbnail' ||
              key == 'attachment'
            ) {
              return (
                <Descriptions.Item label={Util.titleCase(key)}>
                  <Image style={{ width: '50px' }} src={data?.data[key]} />
                </Descriptions.Item>
              )
            } else if (data?.data[key] == true || data?.data[key] == false) {
              return (
                <Descriptions.Item label={Util.titleCase(key)}>
                  {data?.data[key] ? (
                    <CheckCircleOutlined style={{ color: 'green' }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: 'red' }} />
                  )}
                </Descriptions.Item>
              )
            } else if (key.includes('At')) {
              return (
                <Descriptions.Item label={Util.titleCase(key)}>
                  {Util.formatDatetime(data?.data[key])}
                </Descriptions.Item>
              )
            } else {
              return (
                <Descriptions.Item label={Util.titleCase(key)}>
                  {data?.data[key] || '-'}
                </Descriptions.Item>
              )
            }
          })}
        </DescriptionContainer>
      </Row>
    </>
  )
}

export default AccountDetail
