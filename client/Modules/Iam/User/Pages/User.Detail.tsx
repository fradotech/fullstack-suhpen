import { Descriptions, Tag } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../../Components/Organisms/Description/DescriptionItem'
import { Route } from '../../../../Enums/Route'
import { Util } from '../../../../common/utils/util'
import { RoleAction } from '../../Role/infrastructure/role.action'
import { UserAction } from '../infrastructure/user.action'

const UserDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await UserAction.findOne(id)
  const { isLoading, data } = useQuery([UserDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="User Detail"
        isLoading={isLoading}
        hrefIndex={Route.user.index}
        hrefEdit={Route.user.edit(id)}
        hrefDelete={Route.user.id(id)}
      />
      <Section>
        <DescriptionContainer>
          {fields?.map((key) => {
            if (key == 'role') {
              return (
                <Descriptions.Item label={Util.titleCase(key)}>
                  <Tag color={RoleAction.colorRole(data?.data[key])}>
                    {data?.data[key]}
                  </Tag>
                </Descriptions.Item>
              )
            } else {
              return DescriptionItem(data?.data, key)
            }
          })}
        </DescriptionContainer>
      </Section>
    </>
  )
}

export default UserDetail
