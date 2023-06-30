import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import DescriptionContainer from '../../../../Components/Organisms/Description/DescriptionContainer'
import DescriptionItem from '../../../../Components/Organisms/Description/DescriptionItem'
import { Route } from '../../../../Enums/Route'
import { RoleAction } from '../infrastructure/role.action'

const RoleDetail: React.FC = () => {
  const { id } = useParams()
  const fetch = async () => await RoleAction.findOne(id)
  const { isLoading, data } = useQuery([RoleDetail.name], fetch)
  const fields = data?.data && Object.keys(data.data)

  return (
    <>
      <PageHeader
        title="Role Detail"
        isLoading={isLoading}
        hrefIndex={Route.role.index}
        hrefEdit={Route.role.edit(id)}
        hrefDelete={Route.role.id(id)}
      />
      <Section>
        <DescriptionContainer>
          {fields?.map((key) => DescriptionItem(data?.data, key))}
        </DescriptionContainer>
      </Section>
    </>
  )
}

export default RoleDetail
