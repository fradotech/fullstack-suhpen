import { UserOutlined } from '@ant-design/icons'
import { Avatar, Descriptions, Row, Tag } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../../Components/Organisms/Description/DescriptionItem'
import { Util } from '../../../../common/utils/util'
import { AccountAction } from '../infrastructure/account.action'

const AccountDetail: React.FC = () => {
  const fetch = async () => await AccountAction.userLoggedServer()
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
            {fields?.map((key) => {
              if (key == 'role') {
                return (
                  <Descriptions.Item label={Util.titleCase(key)}>
                    {data?.data.roles.map((role) => {
                      return (
                        <Tag key={role.key} color={role.labelColor}>
                          {role.name}
                        </Tag>
                      )
                    })}
                  </Descriptions.Item>
                )
              } else {
                return DescriptionItem(data?.data, key)
              }
            })}
          </DescriptionContainer>
        </Row>
      </Section>
    </>
  )
}

export default AccountDetail
