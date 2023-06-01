import { UserOutlined } from '@ant-design/icons'
import { Avatar, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../../Components/Organisms/Description/DescriptionItem'
import { accountAction } from '../infrastructure/account.action'

const AccountDetail: React.FC = () => {
  const fetch = async () => await accountAction.getUserLogged()
  const { isLoading, data } = useQuery([AccountDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader title="Account" isLoading={isLoading} />
      <Section>
        <Row>
          <Avatar
            size={250}
            icon={<UserOutlined />}
            style={{ margin: '32px' }}
            src={data?.data.avatar}
          />
          <DescriptionContainer>
            {fields?.map((key) => DescriptionItem(data?.data, key))}
          </DescriptionContainer>
        </Row>
      </Section>
    </>
  )
}

export default AccountDetail
